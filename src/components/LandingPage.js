import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import { storage } from '../firebaseConfig'; // Import storage from firebaseConfig
import { ref, listAll, getDownloadURL } from 'firebase/storage'; // Import required functions
import './LandingPage.css';

const LandingPage = () => {
  const [clickedImage, setClickedImage] = useState(null);
  const [smallImageUrls, setSmallImageUrls] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false); // State for dropdown menu

  useEffect(() => {
    const loadImages = async () => {
      try {
        const storageRef = ref(storage, 'gallery/landingpage/');
        const imageRefs = await listAll(storageRef);
        const urls = await Promise.all(
          imageRefs.items.map(async (imageRef) => {
            const url = await getDownloadURL(imageRef);
            return url;
          })
        );
        setSmallImageUrls(urls);
      } catch (error) {
        console.error('Error fetching small images from Firebase Storage:', error);
        setSmallImageUrls([]); // Handle the empty state gracefully
        alert("Failed to load images. Please try again later."); // User feedback
      }
    };

    loadImages();
  }, []);

  const handleImageClick = (imageIndex) => {
    setClickedImage(imageIndex);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen); // Toggle dropdown state
  };

  // Room details array
  const roomDetails = [
    { details: '2 Adults | Breakfast & Dinner', price: 'ZA950', originalPrice: 'ZA1200' },
    { details: 'Group (School/Church) | Breakfast & Dinner', price: 'ZA1450', originalPrice: 'ZA1950' },
    { details: '2 Adults & 2 Kids | Breakfast & Dinner', price: 'ZA750', originalPrice: 'ZA1100' },
    { details: 'Sharing (4 People) | Breakfast & Dinner', price: 'ZA920', originalPrice: 'ZA1400' }
  ];

  return (
    <div className="container-fluid landing-page">
      <header className="row align-items-center">
        <div className="col-6 text-left d-flex align-items-center">
          <img
            src="https://i.pinimg.com/564x/d2/c1/36/d2c136b481507a78ad8eee3933a6026d.jpg"
            alt="Sunset Heaven Lodge logo"
            className="logo"
          />
          <h1 className="lodge-title ml-3">Sunset Heaven Lodge</h1>
        </div>
        <div className="col-6 text-right">
          {/* Hamburger icon */}
          <button className="navbar-toggler" type="button" onClick={toggleDropdown}>
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Dropdown menu */}
          {dropdownOpen && (
            <div className="dropdown-menu show">
              <Link to="/register" className="dropdown-item">Register</Link>
              <Link to="/login" className="dropdown-item">Login</Link>
              <Link to="/about" className="dropdown-item">About</Link>
              <Link to="/profile" className="dropdown-item">My Profile</Link>
              <Link to="/accommodations" className="dropdown-item">Accommodation</Link>
              <Link to="/gallery" className="dropdown-item">Gallery</Link>
            </div>
          )}
        </div>
      </header>

      <section className="row">
        <div className="col-12">
          <div className="main-image-container">
            <div className="row">
              <div className="col-md-4">
                <img
                  src="https://i.pinimg.com/564x/3e/a7/bf/3ea7bfd8b4de66887413d3457b826f31.jpg"
                  alt="Hotel exterior with pool at sunset"
                  className={`main-image img-fluid ${clickedImage === 1 ? 'clicked' : ''}`}
                  onClick={() => handleImageClick(1)}
                />
              </div>
              <div className="col-md-4">
                <img
                  src="https://i.pinimg.com/564x/bf/8c/d5/bf8cd5a43bc750c38b46fd5522bbf43e.jpg"
                  alt="Modern hotel lobby with seating area"
                  className={`main-image img-fluid ${clickedImage === 2 ? 'clicked' : ''}`}
                  onClick={() => handleImageClick(2)}
                />
              </div>
              <div className="col-md-4">
                <img
                  src="https://i.pinimg.com/564x/8b/74/70/8b7470a891a8aae1c13e725ed37e617c.jpg"
                  alt="Cozy hotel room with ocean view"
                  className={`main-image img-fluid ${clickedImage === 3 ? 'clicked' : ''}`}
                  onClick={() => handleImageClick(3)}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="row events-offers">
        <div className="col-6 text-center">
          <h4 className="blinking-text">Upcoming Events</h4>
          <ul>
            <li>Summer Musical Festival (September 14th)</li>
            <li>Family Fun Day (September 28th)</li>
          </ul>
        </div>
        <div className="col-6 text-center">
          <h4 className="blinking-text">Special Offers</h4>
          <p>Book 3 nights, get 1 Free!</p>
          <p>20% off Boat Cruise for early bookings!</p>
        </div>
      </section>

      <section className="row small-images-section">
        {smallImageUrls.length > 0 ? (
          smallImageUrls.map((url, index) => (
            <div key={index} className="col-3">
              <div className="small-image">
                <img
                  src={url}
                  alt={`Room detail ${index + 1} at Sunset Heaven Lodge`}
                  className={`img-fluid ${clickedImage === index + 4 ? 'clicked' : ''}`}
                  onClick={() => handleImageClick(index + 4)}
                />
                <p className="room-details">{roomDetails[index]?.details || 'No details available'}</p>
                <p className="price">
                  <span className="crushed-price">{roomDetails[index]?.originalPrice || 'ZA0'}</span> 
                  {roomDetails[index]?.price || 'ZA0'}
                </p>
              </div>
            </div>
          ))
        ) : (
          <div className="col-12 text-center">No images available</div>
        )}
      </section>

      <footer className="row footer">
        <div className="col-3">
          <div className="social-icons">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><i className="fab fa-facebook"></i></a>
            <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer"><i className="fab fa-tiktok"></i></a>
            <a href="https://chrome.com" target="_blank" rel="noopener noreferrer"><i className="fab fa-chrome"></i></a>
          </div>
        </div>
        <div className="col-6 text-center">
          <a href="https://www.google.com/maps?q=Cradlemoon+Road,+Muldersdrift+Mountains" target="_blank" rel="noopener noreferrer">
            <i className="fas fa-map-marker-alt"></i> View on Google Maps
          </a>
        </div>
        <div className="col-3 text-right">
          <a href="mailto:sunsetlodge@gmail.com"><i className="fas fa-envelope"></i> sunsetlodge@gmail.com</a>
          <a href="tel:0110403322"><i className="fas fa-phone"></i> 011 040 3322</a>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
