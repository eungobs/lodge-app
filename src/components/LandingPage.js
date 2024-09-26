import React, { useState, useEffect } from 'react';
import { db } from '../firebaseConfig';
import { collection, getDocs, doc, updateDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, Typography, Button, Grid, Box, TextField } from '@mui/material';
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
  const [zoomedImage, setZoomedImage] = useState(null); // Added state for zoomed image
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
                    : 'No utilities available'}
                </Typography>
                {accommodation.breakfastIncluded && <Typography variant="body1">Breakfast Included</Typography>}

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

      {zoomedImage && (
        <Box 
          onClick={() => setZoomedImage(null)} 
          sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <img 
            src={zoomedImage} 
            alt="Zoomed" 
            style={{ maxWidth: '80%', maxHeight: '80%' }} 
          />
        </Box>
      )}
    </Box>
  );
};

export default AccommodationList;








