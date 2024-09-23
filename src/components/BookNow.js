import React, { useState, useEffect } from 'react';
import { Container, Form, Button, InputGroup, FormControl } from 'react-bootstrap';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useParams, useNavigate } from 'react-router-dom';

const BookNow = ({ handleBooking }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [accommodation, setAccommodation] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);
  const [totalAmount, setTotalAmount] = useState(0);
  const [message, setMessage] = useState('');
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [childrenAges, setChildrenAges] = useState([]);

  const pricePerNight = 150; // Price per night

  // Fetch accommodation details (dummy data for now)
  useEffect(() => {
    const fetchAccommodation = async () => {
      const fetchedAccommodation = { id, name: 'Sample Accommodation' }; // Dummy data
      setAccommodation(fetchedAccommodation);
    };

    fetchAccommodation();
  }, [id]);

  // Calculate total amount based on check-in and check-out dates
  useEffect(() => {
    if (checkInDate && checkOutDate) {
      const diffTime = Math.abs(checkOutDate - checkInDate);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); // Calculate number of nights
      setTotalAmount(diffDays * pricePerNight);
    } else {
      setTotalAmount(0); // Reset amount if dates are not selected
    }
  }, [checkInDate, checkOutDate]);

  // Handle booking submission
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
      adults,
      children,
      childrenAges,
    };

    handleBooking(bookingDetails);
    // Navigate to the payment page and pass the booking details as state
    navigate('/payment', { state: { bookingDetails } });
  };

  // Handle adding more children ages
  const handleAddChildren = () => {
    setChildrenAges([...childrenAges, '']);
  };

  // Handle age change for children
  const handleAgeChange = (index, value) => {
    const updatedAges = [...childrenAges];
    updatedAges[index] = value;
    setChildrenAges(updatedAges);
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

          <Form.Group controlId="formAdults">
            <Form.Label>Number of Adults</Form.Label>
            <Form.Control
              type="number"
              min="1"
              value={adults}
              onChange={(e) => setAdults(Number(e.target.value))}
              required
            />
          </Form.Group>

          <Form.Group controlId="formChildren">
            <Form.Label>Number of Children</Form.Label>
            <Form.Control
              type="number"
              min="0"
              value={children}
              onChange={(e) => setChildren(Number(e.target.value))}
              required
            />
          </Form.Group>

          {children > 0 && (
            <div>
              <h5>Children's Ages</h5>
              {childrenAges.map((age, index) => (
                <InputGroup className="mb-2" key={index}>
                  <FormControl
                    type="number"
                    placeholder={`Age of child ${index + 1}`}
                    value={age}
                    onChange={(e) => handleAgeChange(index, e.target.value)}
                    required
                  />
                </InputGroup>
              ))}
              <Button variant="secondary" onClick={handleAddChildren}>
                Add Another Child
              </Button>
            </div>
          )}

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
