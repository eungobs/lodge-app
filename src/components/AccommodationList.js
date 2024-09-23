import React, { useState, useEffect } from 'react';
import { db } from '../firebaseConfig';
import { collection, getDocs, doc, updateDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardMedia, Typography, Button, Grid, Box, Modal } from '@mui/material';

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
  const [open, setOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState('');
  const [ratings, setRatings] = useState({});
  const [ratingCounts, setRatingCounts] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAccommodations = async () => {
      const accommodationsCollection = collection(db, 'accommodationRoom');
      const accommodationsSnapshot = await getDocs(accommodationsCollection);
      const accommodationsList = accommodationsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));

      // Fetch ratings from Firestore for each accommodation
      const fetchedRatings = {};
      const fetchedRatingCounts = {};

      accommodationsSnapshot.docs.forEach(doc => {
        const data = doc.data();
        if (data.ratings) {
          const totalRatings = Object.values(data.ratings).reduce((sum, val) => sum + val, 0);
          const ratingCount = Object.values(data.ratings).length;
          fetchedRatings[doc.id] = totalRatings / ratingCount;
          fetchedRatingCounts[doc.id] = ratingCount;
        }
      });

      setRatings(fetchedRatings);
      setRatingCounts(fetchedRatingCounts);
      setAccommodations(accommodationsList);
    };

    fetchAccommodations();
  }, []);

  const handleBook = (accommodation) => {
    navigate(`/book/${accommodation.id}`, { state: { amount: accommodation.price, name: accommodation.name } });
  };

  const handleImageClick = (image) => {
    setCurrentImage(image);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setCurrentImage('');
  };

  // Function to handle star rating click
  const handleRating = async (id, rating) => {
    const accommodationRef = doc(db, 'accommodationRoom', id);
    const newCount = (ratingCounts[id] || 0) + 1;

    // Update Firestore with the new rating
    await updateDoc(accommodationRef, {
      [`ratings.${newCount}`]: rating, // Add the rating to Firestore
    });

    // Update the local state
    setRatings((prevRatings) => ({
      ...prevRatings,
      [id]: ((prevRatings[id] || 0) * (ratingCounts[id] || 0) + rating) / newCount,
    }));
    setRatingCounts((prevCounts) => ({
      ...prevCounts,
      [id]: newCount,
    }));
  };

  const renderStars = (id) => {
    const rating = ratings[id] || 0; // Get the rating or default to 0
    const count = ratingCounts[id] || 0; // Get the count or default to 0
    return (
      <Box>
        {[...Array(5)].map((_, index) => (
          <span 
            key={index} 
            onClick={() => handleRating(id, index + 1)} // Set rating on click
            style={{
              cursor: 'pointer',
              fontSize: '24px',
              color: index < rating ? 'gold' : 'gray' // Fill stars based on rating
            }}
          >
            ★
          </span>
        ))}
        <Typography variant="body2" color="text.secondary">
          {count > 0 ? `${count} ${count === 1 ? 'person' : 'people'} rated` : 'No ratings yet'}
        </Typography>
      </Box>
    );
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
      <Grid container spacing={2}>
        {accommodations.map(accommodation => (
          <Grid item xs={12} sm={6} md={4} key={accommodation.id}>
            <Card sx={{ maxWidth: 345, margin: 'auto', position: 'relative' }}>
              {accommodation.images && accommodation.images.length > 0 && (
                <CardMedia
                  component="img"
                  height="140"
                  image={accommodation.images[0]} // Display the first image
                  alt={accommodation.name}
                  sx={{ cursor: 'pointer' }}
                />
              )}
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
                <Typography variant="body1">Utilities: {accommodation.utilities ? 
                  Object.entries(accommodation.utilities)
                    .filter(([key, value]) => value)
                    .map(([key]) => `${UtilityIcons[key]} ${key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}`)
                    .join(', ') 
                  : 'No utilities available'}
                </Typography>
                {accommodation.breakfastIncluded && <Typography variant="body1">Breakfast Included</Typography>}
                
                {/* Render the star rating and count */}
                {renderStars(accommodation.id)}
                
                <Button 
                  variant="contained" 
                  color="primary" 
                  onClick={() => handleBook(accommodation)} // Pass the whole accommodation object
                  sx={{ marginTop: 2 }}
                >
                  Book Now
                </Button>
              </CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
                <img
                  src={accommodation.images[0]} // Display the first image
                  alt={accommodation.name}
                  style={{ width: '100%', cursor: 'pointer' }}
                  onClick={() => handleImageClick(accommodation.images[0])} // Handle image click
                />
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Modal to display full image */}
      <Modal open={open} onClose={handleClose}>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
          <img src={currentImage} alt="Accommodation" style={{ maxHeight: '90%', maxWidth: '90%' }} />
        </Box>
      </Modal>
    </Box>
  );
};

export default AccommodationList;
