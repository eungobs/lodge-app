// src/components/BookNow.js
import React, { useState, useEffect } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useParams, useNavigate } from 'react-router-dom';

const BookNow = ({ handleBooking }) => {
  const { id } = useParams(); // Get the ID from the URL
  const navigate = useNavigate(); // Initialize navigate hook
  const [accommodation, setAccommodation] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);
  const [totalAmount, setTotalAmount] = useState(0);
  const [message, setMessage] = useState('');

  const pricePerNight = 150; // Define the price per night here

  useEffect(() => {
    // Fetch accommodation details based on the ID
    const fetchAccommodation = async () => {
      // Simulate fetching accommodation data
      // Replace with actual API call or data fetch
      const fetchedAccommodation = { id, name: 'Sample Accommodation' }; // Dummy data
      setAccommodation(fetchedAccommodation);
    };

    fetchAccommodation();
  }, [id]);

  useEffect(() => {
    if (checkInDate && checkOutDate) {
      const diffTime = Math.abs(checkOutDate - checkInDate);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); // Calculate the number of days
      setTotalAmount(diffDays * pricePerNight); // Calculate the total amount
    } else {
      setTotalAmount(0);
    }
  }, [checkInDate, checkOutDate]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!accommodation) {
      setMessage('Accommodation not found');
      return;
    }

    const bookingDetails = {
      name,
      email,
      accommodationId: accommodation.id,
      checkInDate,
      checkOutDate,
      totalAmount,
    };

    handleBooking(bookingDetails);

    // Navigate to payment page with the booking details
    navigate('/payment', { state: { bookingDetails } });
  };

  return (
    <Container className="mt-5">
      <h2 className="text-center">Book Now</h2>
      {accommodation ? (
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group controlId="formEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group controlId="formCheckIn">
            <Form.Label>Check-in Date</Form.Label>
            <DatePicker
              selected={checkInDate}
              onChange={(date) => setCheckInDate(date)}
              dateFormat="yyyy/MM/dd"
              className="form-control"
              placeholderText="Select check-in date"
              required
            />
          </Form.Group>

          <Form.Group controlId="formCheckOut">
            <Form.Label>Check-out Date</Form.Label>
            <DatePicker
              selected={checkOutDate}
              onChange={(date) => setCheckOutDate(date)}
              dateFormat="yyyy/MM/dd"
              className="form-control"
              placeholderText="Select check-out date"
              required
              minDate={checkInDate}
            />
          </Form.Group>

          <div className="mt-3">
            <strong>Total Amount: ${totalAmount}</strong>
          </div>

          <Button variant="primary" type="submit" className="mt-3">
            Confirm Booking
          </Button>
        </Form>
      ) : (
        <p>Loading accommodation details...</p>
      )}
      {message && <p className="text-danger text-center mt-3">{message}</p>}
    </Container>
  );
};

BookNow.propTypes = {
  handleBooking: PropTypes.func.isRequired,
};

export default BookNow;
