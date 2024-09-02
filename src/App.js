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
import Gallery from './components/Gallery';
import BookNow from './components/BookNow';
import Payment from './components/Payment';
import PayPalButton from './components/PayPalButton'; // Import the PayPalButton component
import '@fortawesome/fontawesome-free/css/all.min.css';

// Sample data for accommodations
const accommodations = [
  {
    id: 1,
    images: [
      'https://i.pinimg.com/564x/64/40/4f/64404fb92bfa2931fe33f388ce0daf54.jpg',
      'https://i.pinimg.com/736x/ed/0c/1f/ed0c1f55d8f902dc24f9fcf02e64ea74.jpg',
      'https://i.pinimg.com/736x/c8/82/3f/c8823f07ef0dce525c3861a3d5454a50.jpg'
    ],
    name: 'Deluxe Room',
    description: 'A spacious room with a beautiful view.',
    price: 150,
    breakfastIncluded: true,
    breakfastAndDinnerIncluded: true,
  },
  {
    id: 2,
    images: [
      'https://i.pinimg.com/564x/07/77/69/0777694f7f578f84767ab82c9eb5fa05.jpg',
      'https://i.pinimg.com/564x/9e/64/d0/9e64d0f920139b3ca34b4d66bd586974.jpg',
      'https://i.pinimg.com/564x/a4/0d/e9/a40de902710799f00c5949b548cf0e1c.jpg'
    ],
    name: 'Deluxe Room',
    description: 'A spacious room with a beautiful view.',
    price: 150,
    breakfastIncluded: true,
    breakfastAndDinnerIncluded: true,
  },
  {
    id: 3,
    images: [
      'https://i.pinimg.com/564x/6b/18/84/6b1884dd60007688fc10d2f5c386bdec.jpg',
      'https://i.pinimg.com/564x/9e/64/d0/9e64d0f920139b3ca34b4d66bd586974.jpg',
      'https://i.pinimg.com/564x/0e/ab/c1/0eabc11bbbcccd56a34c858f2a084342.jpg'
    ],
    name: 'Standard Room',
    description: 'A comfortable room with essential amenities.',
    price: 100,
    breakfastIncluded: true,
    breakfastAndDinnerIncluded: false,
  },
  {
    id: 4,
    images: [
      'https://i.pinimg.com/564x/64/40/4f/64404fb92bfa2931fe33f388ce0daf54.jpg',
      'https://i.pinimg.com/736x/ed/0c/1f/ed0c1f55d8f902dc24f9fcf02e64ea74.jpg',
      'https://i.pinimg.com/736x/c8/82/3f/c8823f07ef0dce525c3861a3d5454a50.jpg'
    ],
    name: 'Deluxe Room',
    description: 'A spacious room with a beautiful view.',
    price: 150,
    breakfastIncluded: true,
    breakfastAndDinnerIncluded: true,
  },
  {
    id: 5,
    images: [
      'https://i.pinimg.com/564x/6b/18/84/6b1884dd60007688fc10d2f5c386bdec.jpg',
      'https://i.pinimg.com/736x/ed/0c/1f/ed0c1f55d8f902dc24f9fcf02e64ea74.jpg',
      'https://i.pinimg.com/564x/0e/ab/c1/0eabc11bbbcccd56a34c858f2a084342.jpg'
    ],
    name: 'Deluxe Room',
    description: 'A spacious room with a beautiful view.',
    price: 150,
    breakfastIncluded: true,
    breakfastAndDinnerIncluded: true,
  },
  {
   id: 6,
    images: [
      'https://i.pinimg.com/564x/e9/a5/6d/e9a56dbd2b6337eff4b4af6061d833ed.jpg',
      'https://i.pinimg.com/564x/f5/24/55/f524557f25ec4ca5380ce17333ce951b.jpg',
      'https://i.pinimg.com/564x/7f/cc/49/7fcc49c98c9b6bd5169083143c3d7d19.jpg'
    ],
    name: 'Deluxe Room',
    description: 'A spacious room with a beautiful view.',
    price: 150,
    breakfastIncluded: true,
    breakfastAndDinnerIncluded: true,
  },
  {
    id: 7,
    images: [
      'https://i.pinimg.com/564x/64/40/4f/64404fb92bfa2931fe33f388ce0daf54.jpg',
      'https://i.pinimg.com/736x/ed/0c/1f/ed0c1f55d8f902dc24f9fcf02e64ea74.jpg',
      'https://i.pinimg.com/736x/c8/82/3f/c8823f07ef0dce525c3861a3d5454a50.jpg'
    ],
    name: 'Deluxe Room',
    description: 'A spacious room with a beautiful view.',
    price: 150,
    breakfastIncluded: true,
    breakfastAndDinnerIncluded: true,
  },
  {
    id: 8,
    images: [
      'https://i.pinimg.com/564x/b6/db/1c/b6db1c138a19f8dd4fcdcf8758915954.jpg',
      'https://i.pinimg.com/564x/19/21/69/19216987d1a56c843dffb3c2efebb7b4.jpg',
      'https://i.pinimg.com/564x/d6/0a/4b/d60a4bf5f85376022abcba0a2b56b07b.jpg'
    ],
    name: 'Deluxe Room',
    description: 'A spacious room with a beautiful view.',
    price: 150,
    breakfastIncluded: true,
    breakfastAndDinnerIncluded: true,
  },
  {
    id: 9,
    images: [
      'https://i.pinimg.com/564x/e9/a5/6d/e9a56dbd2b6337eff4b4af6061d833ed.jpg',
      'https://i.pinimg.com/564x/f5/24/55/f524557f25ec4ca5380ce17333ce951b.jpg',
      'https://i.pinimg.com/564x/7f/cc/49/7fcc49c98c9b6bd5169083143c3d7d19.jpg'
    ],
    name: 'Deluxe Room',
    description: 'A spacious room with a beautiful view.',
    price: 150,
    breakfastIncluded: true,
    breakfastAndDinnerIncluded: true,
  },
  {
    id: 10,
    images: [
      'https://i.pinimg.com/564x/64/40/4f/64404fb92bfa2931fe33f388ce0daf54.jpg',
      'https://i.pinimg.com/736x/ed/0c/1f/ed0c1f55d8f902dc24f9fcf02e64ea74.jpg',
      'https://i.pinimg.com/736x/c8/82/3f/c8823f07ef0dce525c3861a3d5454a50.jpg'
    ],
    name: 'Deluxe Room',
    description: 'A spacious room with a beautiful view.',
    price: 150,
    breakfastIncluded: true,
    breakfastAndDinnerIncluded: true,
  },
  {
    id: 11,
    images: [
      'https://i.pinimg.com/564x/60/49/d7/6049d77f4f3f278dc738e0cf29b21f7e.jpg',
      'https://i.pinimg.com/736x/ed/0c/1f/ed0c1f55d8f902dc24f9fcf02e64ea74.jpg',
      'https://i.pinimg.com/736x/c8/82/3f/c8823f07ef0dce525c3861a3d5454a50.jpg'
    ],
    name: 'Deluxe Room',
    description: 'A spacious room with a beautiful view.',
    price: 150,
    breakfastIncluded: true,
    breakfastAndDinnerIncluded: true,
  },
  {
    id: 12,
    images: [
      'https://i.pinimg.com/564x/b6/db/1c/b6db1c138a19f8dd4fcdcf8758915954.jpg',
      'https://i.pinimg.com/564x/19/21/69/19216987d1a56c843dffb3c2efebb7b4.jpg',
      'https://i.pinimg.com/564x/d6/0a/4b/d60a4bf5f85376022abcba0a2b56b07b.jpg'
    ],
    name: 'Deluxe Room',
    description: 'A spacious room with a beautiful view.',
    price: 150,
    breakfastIncluded: true,
    breakfastAndDinnerIncluded: true,
  },
  {
    id: 13,
    images: [
      'https://i.pinimg.com/564x/b8/43/f7/b843f73e1331dd74f6a4d607cf331fda.jpg',
      'https://i.pinimg.com/736x/ed/0c/1f/ed0c1f55d8f902dc24f9fcf02e64ea74.jpg',
      'https://i.pinimg.com/736x/c8/82/3f/c8823f07ef0dce525c3861a3d5454a50.jpg'
    ],
    name: 'Deluxe Room',
    description: 'A spacious room with a beautiful view.',
    price: 150,
    breakfastIncluded: true,
    breakfastAndDinnerIncluded: true,
  },
  {
    id: 14,
    images: [
      'https://i.pinimg.com/564x/64/40/4f/64404fb92bfa2931fe33f388ce0daf54.jpg',
      'https://i.pinimg.com/736x/ed/0c/1f/ed0c1f55d8f902dc24f9fcf02e64ea74.jpg',
      'https://i.pinimg.com/736x/c8/82/3f/c8823f07ef0dce525c3861a3d5454a50.jpg'
    ],
    name: 'Deluxe Room',
    description: 'A spacious room with a beautiful view.',
    price: 150,
    breakfastIncluded: true,
    breakfastAndDinnerIncluded: true,
  },
  {
    id: 15,
    images: [
      'https://i.pinimg.com/564x/70/ae/ba/70aebac87da85b4b180068444473a178.jpg',
      'https://i.pinimg.com/564x/d8/22/12/d82212f20b9ea24fc999ce6cad4ffb63.jpg',
      'https://i.pinimg.com/736x/c8/82/3f/c8823f07ef0dce525c3861a3d5454a50.jpg'
    ],
    name: 'Deluxe Room',
    description: 'A spacious room with a beautiful view.',
    price: 150,
    breakfastIncluded: true,
    breakfastAndDinnerIncluded: true,
  },
  
];

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
          element={<AccommodationList accommodations={accommodations} />} 
        />
        <Route path="/boat-cruise" element={<BoatCruise />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
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