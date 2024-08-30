import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import AccommodationList from './components/AccommodationList';
import BoatCruise from './components/BoatCruise';
import AdminPanel from './components/AdminPanel';
import Login from './components/Login';
import Register from './components/Register';
import Profile from './components/Profile';
import About from './components/About';
import Gallery from './components/Gallery'; // Import the Gallery component
import '@fortawesome/fontawesome-free/css/all.min.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/accommodations" element={<AccommodationList />} />
        <Route path="/boat-cruise" element={<BoatCruise />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/about" element={<About />} />
        <Route path="/gallery" element={<Gallery />} /> {/* Add Gallery Route */}
      </Routes>
    </Router>
  );
}

export default App;


      
