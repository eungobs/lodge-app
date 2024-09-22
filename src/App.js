import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import AccommodationList from './components/AccommodationList';
import Login from './components/Login';
import Register from './components/Register';
import Profile from './components/Profile';
import EditProfile from './components/EditProfile';
import About from './components/About';
import Gallery from './components/Gallery';
import BookNow from './components/BookNow';
import Payment from './components/Payment';
import PayPalButton from './components/PayPalButton'; // Import the PayPalButton component
import '@fortawesome/fontawesome-free/css/all.min.css';

const App = () => {
  const handleBooking = (bookingDetails) => {
    console.log('Booking Details:', bookingDetails);
    // Implement your booking logic here (e.g., send details to a server)
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route 
          path="/accommodations" 
          element={<AccommodationList accommodations={[]} />} 
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/edit-profile" element={<EditProfile />} />
        <Route path="/about" element={<About />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route 
          path="/book/:id" 
          element={<BookNow handleBooking={handleBooking} />} 
        />
        <Route path="/payment" element={<Payment />} />
        <Route path="/paypal" element={<div><h1>PayPal Payment Integration</h1><PayPalButton /></div>} />
      </Routes>
    </Router>
  );
};

export default App;
