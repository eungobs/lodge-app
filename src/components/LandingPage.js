import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import './LandingPage.css';

const LandingPage = () => {
  return (
    <div className="container-fluid landing-page">
      {/* Header Section */}
      <header className="row align-items-center">
        <div className="col-6 text-left">
          <img src="https://i.pinimg.com/564x/d2/c1/36/d2c136b481507a78ad8eee3933a6026d.jpg" alt="Logo" className="logo" />
        </div>
        <div className="col-6 text-right header-buttons">
          <Link to="/register" className="btn btn-secondary">Register</Link>
          <Link to="/login" className="btn btn-secondary">Login</Link>
          <Link to="/about" className="btn btn-secondary">About</Link>
          <Link to="/profile" className="btn btn-secondary">My Profile</Link>
          <Link to="/accommodations" className="btn btn-secondary">Accommodation</Link>
          <Link to="/gallery" className="btn btn-secondary">Gallery</Link>
        </div>
      </header>

      <h1 className="text-center lodge-title">Sunset Heaven Lodge</h1>

      {/* Main Image Section */}
      <section className="row">
        <div className="col-12">
          <div className="main-image-container">
            <img src="https://i.pinimg.com/564x/3e/a7/bf/3ea7bfd8b4de66887413d3457b826f31.jpg" alt="Lodge" className="main-image img-fluid" />
          </div>
        </div>
      </section>

      {/* Events and Offers Section */}
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

      {/* Small Images Section */}
      <section className="row small-images-section">
        <div className="col-3">
          <div className="small-image">
            <img src="https://i.pinimg.com/564x/ad/6b/a7/ad6ba7bf5446d0acbc39adb41cbc94c9.jpg" alt="Room for 2 Adults" />
            <p className="room-details">2 Adults | Breakfast & Dinner</p>
            <p className="price"><span className="crushed-price">ZA1200</span> ZA950</p>
          </div>
        </div>
        <div className="col-3">
          <div className="small-image">
            <img src="https://i.pinimg.com/564x/72/c9/21/72c921591058bba1215c367dc0d91708.jpg" alt="Group Room" />
            <p className="room-details">Group (School/Church) | Breakfast & Dinner</p>
            <p className="price"><span className="crushed-price">ZA1950</span> ZA1450</p>
          </div>
        </div>
        <div className="col-3">
          <div className="small-image">
            <img src="https://i.pinimg.com/564x/d0/55/c6/d055c6192dfc58a5fbfef88f4394d5f1.jpg" alt="Room for Family" />
            <p className="room-details">2 Adults & 2 Kids | Breakfast & Dinner</p>
            <p className="price"><span className="crushed-price">ZA1100</span> ZA750</p>
          </div>
        </div>
        <div className="col-3">
          <div className="small-image">
            <img src="https://i.pinimg.com/564x/88/5b/95/885b9565e63b8071b0d403a16f47ac4a.jpg" alt="Shared Room" />
            <p className="room-details">Sharing (4 People) | Breakfast & Dinner</p>
            <p className="price"><span className="crushed-price">ZA1400</span> ZA920</p>
          </div>
        </div>
      </section>

      {/* Footer Section */}
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
          <a href="tel:0110403322"><i className="fas fa-phone"></i> 011-040-3322</a>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;









