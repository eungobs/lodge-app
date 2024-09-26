import React, { useState, useEffect } from 'react';
import { db } from '../firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, Typography, Button, Grid, Box } from '@mui/material';

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
  const [ratings, setRatings] = useState({}); // Store ratings
  const [ratingCounts, setRatingCounts] = useState({}); // Store rating counts
  const [zoomedImage, setZoomedImage] = useState(null); // Tracks zoomed image
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

  const handleBook = (accommodation) => {
    navigate(`/book/${accommodation.id}`, { state: { amount: accommodation.price, name: accommodation.name } });
  };

  const toggleZoom = (imageSrc) => {
    if (zoomedImage === imageSrc) {
      setZoomedImage(null); // Zoom out if already zoomed
    } else {
      setZoomedImage(imageSrc); // Zoom in
    }
  };

  // Handle star rating click
  const handleRating = (id, newRating) => {
    setRatings((prevRatings) => ({
      ...prevRatings,
      [id]: newRating,
    }));
    setRatingCounts((prevCounts) => ({
      ...prevCounts,
      [id]: (prevCounts[id] || 0) + 1, // Increment count for the accommodation
    }));
  };

  const renderStars = (id) => {
    const rating = ratings[id] || 0;
    const count = ratingCounts[id] || 0;
    return (
      <Box>
        {[...Array(5)].map((_, index) => (
          <span
            key={index}
            onClick={() => handleRating(id, index + 1)}
            style={{
              cursor: 'pointer',
              fontSize: '24px',
              color: index < rating ? 'gold' : 'gray',
            }}
          >
            ★
          </span>
        ))}
        <Typography variant="body2" sx={{ marginLeft: 1 }}>
          {count} {count === 1 ? 'rating' : 'ratings'}
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
                      onClick={() => toggleZoom(image)} // Toggle zoom on click
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
                    : 'No utilities available'}
                </Typography>
                {accommodation.breakfastIncluded && <Typography variant="body1">Breakfast Included</Typography>}

                {/* Add Ratings */}
                {renderStars(accommodation.id)}

                <Button 
                  variant="contained" 
                  color="primary" 
                  onClick={() => handleBook(accommodation)} 
                  sx={{ marginTop: 2 }}
                >
                  Book Now
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Zoomed Image Overlay */}
      {zoomedImage && (
        <Box
          sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000,
          }}
          onClick={() => toggleZoom(null)} // Close zoomed image when clicked
        >
          <img
            src={zoomedImage}
            alt="Zoomed"
            style={{
              maxWidth: '90%',
              maxHeight: '90%',
              cursor: 'pointer',
            }}
          />
        </Box>
      )}
    </Box>
  );
};

export default AccommodationList;




