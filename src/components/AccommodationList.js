import React, { useState, useEffect } from 'react';
import { db } from '../firebaseConfig'; // Ensure this path is correct
import { collection, getDocs } from 'firebase/firestore';
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

  const handleBook = (id) => {
    navigate(`/book/${id}`);
  };

  const handleImageClick = (image) => {
    setCurrentImage(image);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setCurrentImage('');
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4" gutterBottom>Accommodation List</Typography>
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
                <Button variant="contained" color="primary" onClick={() => handleBook(accommodation.id)} sx={{ marginTop: 2 }}>
                  Book Now
                </Button>
              </CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', padding: 1 }}>
                {accommodation.images && accommodation.images.map((image, index) => (
                  <CardMedia
                    key={index}
                    component="img"
                    image={image}
                    alt={`Accommodation ${index + 1}`}
                    sx={{ width: '80px', height: '80px', cursor: 'pointer', objectFit: 'cover' }}
                    onClick={() => handleImageClick(image)} // Zoom on image click
                  />
                ))}
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Modal for Zooming Images */}
      <Modal open={open} onClose={handleClose}>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: 'rgba(0, 0, 0, 0.7)' }}>
          <Box sx={{ maxHeight: '80%', maxWidth: '80%' }}>
            <img 
              src={currentImage} 
              alt="Zoomed accommodation" 
              style={{ width: '100%', cursor: 'pointer' }} 
              onClick={handleClose} // Close modal on image click
            />
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default AccommodationList;


