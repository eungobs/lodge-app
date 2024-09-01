import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import './LandingPage.css';

const LandingPage = () => {
  return (
    <div className="container-fluid landing-page">
      {/* Header Section */}
      <header className="row">
        <div className="col-3">
          <img src="https://i.pinimg.com/564x/d2/c1/36/d2c136b481507a78ad8eee3933a6026d.jpg" alt="Logo" className="logo" />
          <div className="buttons">
            <Link to="/register" className="btn btn-primary register-btn">Register</Link>
            <Link to="/login" className="btn btn-primary login-btn">Login</Link>
            <Link to="/about" className="btn btn-primary about-btn">About</Link>
          </div>
        </div>
        <div className="col-6 text-center">
          <h1 className="lodge-title">Sunset Heaven Lodge</h1>
        </div>
        <div className="col-3 text-right">
          <Link to="/profile" className="btn btn-secondary">My-Profile</Link>
          <Link to="/accommodations" className="btn btn-secondary">Accommodation</Link>
          <Link to="/gallery" className="btn btn-secondary">Gallery</Link>
        </div>
      </header>

      {/* Main Image Section */}
      <section className="row">
        <div className="col-9">
          <img src="https://i.pinimg.com/564x/3d/15/3e/3d153e1f606885d339fb816417def8cc.jpg" alt="Lodge" className="main-image img-fluid" />
        </div>
        <div className="col-3">
          <div className="events">
            <h4>Upcoming Events</h4>
            <ul>
              <li>Summer Musical Festival (September 14th)</li>
              <li>Family Fun Day (September 28th)</li>
            </ul>
          </div>
          <div className="offers">
            <h4>Special Offers</h4>
            <p>Book 3 nights, get 1 Free!</p>
            <p>20% off Boat Cruise for early bookings!</p>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="row footer">
        <div className="col-3">
          <div className="social-icons">
            <i className="fab fa-facebook"></i>
            <i className="fab fa-tiktok"></i>
            <i className="fab fa-chrome"></i>
          </div>
        </div>
        <div className="col-6"></div>
        <div className="col-3 text-right">
          <i className="fas fa-envelope"></i>
          <i className="fas fa-phone"></i>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
