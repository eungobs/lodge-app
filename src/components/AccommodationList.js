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
  const [openModal, setOpenModal] = useState(false); // State for the modal
  const [selectedAccommodation, setSelectedAccommodation] = useState(null); // Selected accommodation for review
  const [reviews, setReviews] = useState([]); // State for storing reviews
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

  // Fetch reviews for a specific accommodation
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

      // Update local state
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
        <Typography variant="body2" sx={{ marginLeft: 1 }}>
          {count} {count === 1 ? 'person rated this' : 'people rated this'}
        </Typography>
      </Box>
    );
  };

  const filteredAccommodations = accommodations.filter(accommodation =>
    accommodation.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // New function to handle review submission
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
      fetchReviews(selectedAccommodation.id).then((reviewsList) => setReviews(reviewsList));
    }
  };

  const handleRateMeClick = (accommodation) => {
    setSelectedAccommodation(accommodation);
    fetchReviews(accommodation.id).then((reviewsList) => setReviews(reviewsList));
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
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
              </CardContent>
              <Button onClick={() => handleBook(accommodation)} variant="contained" sx={{ margin: 1 }}>Book</Button>
              <Button onClick={() => handleRateMeClick(accommodation)} variant="contained" sx={{ margin: 1 }}>Rate Me</Button>
              <Box sx={{ padding: 2 }}>
                {renderStars(accommodation.id)}
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Modal for Review Form */}
      <Modal open={openModal} onClose={handleCloseModal}>
        <Box
          sx={{
            bgcolor: 'background.paper',
            border: '2px solid #000',
            boxShadow: 24,
            p: 4,
            width: '400px',
            margin: 'auto',
            marginTop: '20vh',
          }}
        >
          <Typography variant="h6" component="h2">
            Review {selectedAccommodation?.name}
          </Typography>
          <form onSubmit={handleReviewSubmit}>
            <TextField
              name="name"
              label="Your Name"
              variant="outlined"
              fullWidth
              required
              margin="normal"
            />
            <TextField
              name="roomRating"
              label="Room Rating (1-5)"
              type="number"
              inputProps={{ min: 1, max: 5 }}
              variant="outlined"
              fullWidth
              required
              margin="normal"
            />
            <TextField
              name="lodgeRating"
              label="Lodge Rating (1-5)"
              type="number"
              inputProps={{ min: 1, max: 5 }}
              variant="outlined"
              fullWidth
              required
              margin="normal"
            />
            <TextField
              name="serviceRating"
              label="Service Rating (1-5)"
              type="number"
              inputProps={{ min: 1, max: 5 }}
              variant="outlined"
              fullWidth
              required
              margin="normal"
            />
            <TextField
              name="recommendation"
              label="Recommendations"
              variant="outlined"
              fullWidth
              multiline
              rows={4}
              margin="normal"
            />
            <Button type="submit" variant="contained">Submit Review</Button>
          </form>
          {/* Display reviews */}
          <Typography variant="h6" component="h3" sx={{ marginTop: 2 }}>
            Reviews:
          </Typography>
          {reviews.map(review => (
            <Box key={review.id} sx={{ border: '1px solid #ccc', padding: 1, marginTop: 1 }}>
              <Typography variant="body2"><strong>{review.name}</strong> - {new Date(review.dateReviewed.seconds * 1000).toLocaleDateString()}</Typography>
              <Typography variant="body2">Room Rating: {review.roomRating} | Lodge Rating: {review.lodgeRating} | Service Rating: {review.serviceRating}</Typography>
              <Typography variant="body2">Recommendation: {review.recommendation}</Typography>
            </Box>
          ))}
        </Box>
      </Modal>

      {/* Image Zoom Popup */}
      {zoomedImage && (
        <Box
          onClick={() => setZoomedImage(null)}
          sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.8)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000,
          }}
        >
          <img src={zoomedImage} alt="Zoomed" style={{ maxWidth: '90%', maxHeight: '90%' }} />
        </Box>
      )}
    </Box>
  );
};

export default AccommodationList; 


