import React, { useState, useEffect } from 'react';
import { db } from '../firebaseConfig';
import { collection, getDocs, doc, updateDoc, addDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, Typography, Button, Grid, Box, TextField, Modal } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const UtilityIcons = {
  wifi: '📶',
  gardenView: '🌳',
  airConditioning: '❄️',
  mountainView: '🏔️',
  beachView: '🏖️',
  attachedBathroom: '🚿',
  flatScreenTV: '📺',
  coffeeMachine: '☕',
  parking: '🅿️',
  deviceChargingPorts: '🔌',
  microwave: '🥡',
  iron: '🧺',
  hairDryer: '💇‍♀️',
};

const AccommodationList = () => {
  const [accommodations, setAccommodations] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRatings, setSelectedRatings] = useState({});
  const [zoomedImage, setZoomedImage] = useState(null);
  const [openModal, setOpenModal] = useState(false); 
  const [selectedAccommodation, setSelectedAccommodation] = useState(null); 
  const [openReviewsModal, setOpenReviewsModal] = useState(false); // New state for review modal
  const [currentReviews, setCurrentReviews] = useState([]); // Store reviews for the current accommodation
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAccommodations = async () => {
      const accommodationsCollection = collection(db, 'accommodationRoom');
      const accommodationsSnapshot = await getDocs(accommodationsCollection);
      const accommodationsList = accommodationsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setAccommodations(accommodationsList);
    };

    fetchAccommodations();
  }, []);

  const fetchReviews = async (accommodationId) => {
    const reviewsCollection = collection(db, 'accommodationRoom', accommodationId, 'reviews');
    const reviewsSnapshot = await getDocs(reviewsCollection);
    const reviewsList = reviewsSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
    return reviewsList;
  };

  const handleBook = (accommodation) => {
    navigate(`/book/${accommodation.id}`, { state: { amount: accommodation.price, name: accommodation.name } });
  };

  const toggleZoom = (imageSrc) => {
    setZoomedImage(imageSrc === zoomedImage ? null : imageSrc);
  };

  const submitRatingToFirestore = async (id, newRating) => {
    try {
      const accommodationRef = doc(db, 'accommodationRoom', id);
      const accommodation = accommodations.find(accommodation => accommodation.id === id);
      const newRatingCount = (accommodation.ratingCounts || 0) + 1;
      await updateDoc(accommodationRef, {
        ratings: newRating,
        ratingCounts: newRatingCount,
      });

      setAccommodations(prevAccommodations =>
        prevAccommodations.map(accom =>
          accom.id === id
            ? { ...accom, ratings: newRating, ratingCounts: newRatingCount }
            : accom
        )
      );
    } catch (error) {
      console.error('Error updating rating:', error);
    }
  };

  const handleRating = (id, newRating) => {
    setSelectedRatings((prevRatings) => ({
      ...prevRatings,
      [id]: newRating,
    }));
  };

  const renderStars = (id) => {
    const accommodation = accommodations.find(accommodation => accommodation.id === id);
    const count = accommodation?.ratingCounts || 0;
    const selectedRating = selectedRatings[id] || 0;

    return (
      <Box>
        {[...Array(5)].map((_, index) => (
          <span
            key={index}
            onClick={() => {
              handleRating(id, index + 1);
              submitRatingToFirestore(id, index + 1);
            }}
            style={{
              cursor: 'pointer',
              fontSize: '24px',
              color: index < selectedRating ? 'gold' : 'gray',
            }}
          >
            ★
          </span>
        ))}
        <Typography 
          variant="body2" 
          sx={{ marginLeft: 1, cursor: 'pointer', color: 'blue' }} 
          onClick={() => {
            setOpenReviewsModal(true);
            fetchReviews(accommodation.id).then(setCurrentReviews);
          }}
        >
          {count} {count === 1 ? 'person rated this' : 'people rated this'}
        </Typography>
      </Box>
    );
  };

  const filteredAccommodations = accommodations.filter(accommodation =>
    accommodation.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleReviewSubmit = async (event) => {
    event.preventDefault();
    const { name, roomRating, lodgeRating, serviceRating, recommendation } = event.target.elements;
    if (selectedAccommodation) {
      const reviewsCollection = collection(db, 'accommodationRoom', selectedAccommodation.id, 'reviews');
      await addDoc(reviewsCollection, {
        name: name.value,
        roomRating: parseInt(roomRating.value),
        lodgeRating: parseInt(lodgeRating.value),
        serviceRating: parseInt(serviceRating.value),
        recommendation: recommendation.value,
        dateReviewed: new Date(),
      });
      setOpenModal(false);
      fetchReviews(selectedAccommodation.id).then(setCurrentReviews); // Update reviews directly
    }
  };

  const handleRateMeClick = (accommodation) => {
    setSelectedAccommodation(accommodation);
    fetchReviews(accommodation.id).then(setCurrentReviews);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleCloseReviewsModal = () => {
    setOpenReviewsModal(false);
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Typography 
        variant="h4" 
        gutterBottom 
        sx={{ fontWeight: 'bold', fontStyle: 'italic', textAlign: 'center', marginY: 3 }}
      >
        Accommodations
      </Typography>

      <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 2 }}>
        <SearchIcon />
        <TextField
          label="Search by keyword"
          variant="outlined"
          fullWidth
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ marginLeft: 2 }}
        />
      </Box>

      <Grid container spacing={2}>
        {filteredAccommodations.map(accommodation => (
          <Grid item xs={12} sm={6} md={4} key={accommodation.id}>
            <Card sx={{ maxWidth: 345, margin: 'auto', position: 'relative' }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                {accommodation.images && accommodation.images.length > 0 ? (
                  accommodation.images.slice(0, 3).map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`Accommodation ${index + 1}`}
                      style={{
                        width: '30%',
                        height: 'auto',
                        cursor: 'pointer',
                        margin: '5px',
                        transition: 'transform 0.3s ease',
                      }}
                      onClick={() => toggleZoom(image)}
                    />
                  ))
                ) : (
                  <Typography variant="body2" color="text.secondary">
                    No image available
                  </Typography>
                )}
              </Box>
              <Typography variant="h6" sx={{ position: 'absolute', top: 8, right: 8, backgroundColor: 'green', color: 'white', padding: '5px' }}>
                Available
              </Typography>
              <CardContent>
                <Typography variant="h5">{accommodation.name}</Typography>
                <Typography variant="body2" color="text.secondary">{accommodation.description}</Typography>
                <Typography variant="body1">Price: ${accommodation.price}</Typography>
                <Typography variant="body1">Bed Types: {accommodation.bedTypes}</Typography>
                <Typography variant="body1">Children Policy: {accommodation.childrenPolicy}</Typography>
                <Typography variant="body1">Extra Bed Policy: {accommodation.extraBedPolicy}</Typography>
                <Typography variant="body1">
                  Utilities: {accommodation.utilities ? 
                    Object.entries(accommodation.utilities)
                      .filter(([key, value]) => value)
                      .map(([key]) => `${UtilityIcons[key]} ${key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}`)
                      .join(', ') 
                    : 'No utilities'}
                </Typography>
                {renderStars(accommodation.id)}
                <Button variant="contained" color="primary" onClick={() => handleBook(accommodation)}>
                  Book Now
                </Button>
                <Button variant="outlined" onClick={() => handleRateMeClick(accommodation)}>
                  Rate Me
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Reviews Modal */}
      <Modal open={openReviewsModal} onClose={handleCloseReviewsModal}>
        <Box 
          sx={{ 
            padding: 2, 
            backgroundColor: 'white', 
            maxWidth: 600, 
            margin: 'auto', 
            marginTop: '15%', 
            borderRadius: 2 
          }}
        >
          <Typography variant="h6" sx={{ marginBottom: 2 }}>Reviews</Typography>
          {currentReviews.length > 0 ? (
            currentReviews.map(review => (
              <Box key={review.id} sx={{ marginBottom: 2, padding: 1, border: '1px solid #ccc', borderRadius: 1 }}>
                <Typography variant="subtitle1">{review.name}</Typography>
                <Typography variant="body2">Room Rating: {review.roomRating}</Typography>
                <Typography variant="body2">Lodge Rating: {review.lodgeRating}</Typography>
                <Typography variant="body2">Service Rating: {review.serviceRating}</Typography>
                <Typography variant="body2">Recommendation: {review.recommendation}</Typography>
                <Typography variant="caption" color="text.secondary">
                  {new Date(review.dateReviewed.toDate()).toLocaleDateString()}
                </Typography>
              </Box>
            ))
          ) : (
            <Typography variant="body2">No reviews available for this accommodation.</Typography>
          )}
          <Button variant="outlined" onClick={handleCloseReviewsModal} sx={{ marginTop: 2 }}>Close</Button>
        </Box>
      </Modal>

      {/* Review Submission Modal */}
      <Modal open={openModal} onClose={handleCloseModal}>
        <Box 
          sx={{ 
            padding: 2, 
            backgroundColor: 'rgba(0, 0, 0, 0.8)', // Dark background
            maxWidth: 400, // Smaller width
            margin: 'auto', 
            marginTop: '15%', 
            borderRadius: 2, 
            color: 'white' // Change text color to white for contrast
          }}
        >
          <Typography variant="h6" sx={{ marginBottom: 2 }}>Submit Your Review</Typography>
          <form onSubmit={handleReviewSubmit}>
            <TextField 
              name="name" 
              label="Your Name" 
              variant="outlined" 
              fullWidth 
              required 
              sx={{ marginBottom: 1, backgroundColor: 'white' }} // Background for input
            />
            <TextField 
              name="roomRating" 
              label="Room Rating (1-5)" 
              variant="outlined" 
              fullWidth 
              required 
              type="number" 
              inputProps={{ min: 1, max: 5 }} 
              sx={{ marginBottom: 1, backgroundColor: 'white' }} // Background for input
            />
            <TextField 
              name="lodgeRating" 
              label="Lodge Rating (1-5)" 
              variant="outlined" 
              fullWidth 
              required 
              type="number" 
              inputProps={{ min: 1, max: 5 }} 
              sx={{ marginBottom: 1, backgroundColor: 'white' }} // Background for input
            />
            <TextField 
              name="serviceRating" 
              label="Service Rating (1-5)" 
              variant="outlined" 
              fullWidth 
              required 
              type="number" 
              inputProps={{ min: 1, max: 5 }} 
              sx={{ marginBottom: 1, backgroundColor: 'white' }} // Background for input
            />
            <TextField 
              name="recommendation" 
              label="Would you recommend this?" 
              variant="outlined" 
              fullWidth 
              multiline 
              rows={4} 
              required 
              sx={{ marginBottom: 1, backgroundColor: 'white' }} // Background for input
            />
            <Button type="submit" variant="contained" color="primary" sx={{ marginTop: 1 }}>Submit Review</Button>
          </form>
          <Button variant="outlined" onClick={handleCloseModal} sx={{ marginTop: 2 }}>Close</Button>
        </Box>
      </Modal>
    </Box>
  );
};

export default AccommodationList;


