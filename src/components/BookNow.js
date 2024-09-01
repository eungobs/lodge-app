import React, { useState, useEffect } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useParams } from 'react-router-dom';

const BookNow = ({ handleBooking }) => {
  const { id } = useParams(); // Get the ID from the URL
  const [accommodation, setAccommodation] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('bankTransfer');
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);
  const [message, setMessage] = useState('');

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
      paymentMethod,
      checkInDate,
      checkOutDate,
    };

    handleBooking(bookingDetails);
    setMessage('Booking successful!');
    setName('');
    setEmail('');
    setCheckInDate(null);
    setCheckOutDate(null);
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

          <Form.Group controlId="formPaymentMethod">
            <Form.Label>Payment Method</Form.Label>
            <Form.Check
              type="radio"
              label="Online Bank Payment"
              value="onlineBankPayment"
              checked={paymentMethod === 'onlineBankPayment'}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            <Form.Check
              type="radio"
              label="Bank Transfer"
              value="bankTransfer"
              checked={paymentMethod === 'bankTransfer'}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
          </Form.Group>

          <Button variant="primary" type="submit" className="mt-3">
            Confirm Booking
          </Button>
        </Form>
      ) : (
        <p>Loading accommodation details...</p>
      )}
      {message && <p className="text-success text-center mt-3">{message}</p>}
    </Container>
  );
};

BookNow.propTypes = {
  handleBooking: PropTypes.func.isRequired,
};

export default BookNow;
