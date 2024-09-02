import React from 'react';
import { Container, Card } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Confirmation = () => {
  const location = useLocation();
  const { bookingDetails, bookingId } = location.state || {};

  const { user } = useSelector((state) => state.user);

  console.log('Location state:', location.state); // Debug log

  if (!bookingDetails || !bookingId) {
    return (
      <Container className="mt-5">
        <h2 className="text-center">No Booking Found</h2>
        <p className="text-center">Please make a booking first.</p>
      </Container>
    );
  }

  return (
    <Container className="mt-5">
      <Card>
        <Card.Body>
          <Card.Title>Booking Confirmation</Card.Title>
          <Card.Text>
            <strong>Booking ID:</strong> {bookingId}
          </Card.Text>
          <Card.Text>
            <strong>Name:</strong> {bookingDetails.name}
          </Card.Text>
          <Card.Text>
            <strong>Email:</strong> {bookingDetails.email}
          </Card.Text>
          <Card.Text>
            <strong>Accommodation:</strong> {bookingDetails.accommodationId}
          </Card.Text>
          <Card.Text>
            <strong>Check-in Date:</strong> {new Date(bookingDetails.checkInDate).toLocaleDateString()}
          </Card.Text>
          <Card.Text>
            <strong>Check-out Date:</strong> {new Date(bookingDetails.checkOutDate).toLocaleDateString()}
          </Card.Text>
          <Card.Text>
            <strong>Total Amount:</strong> ${bookingDetails.totalAmount}
          </Card.Text>
          <Card.Text>
            <strong>Payment Method:</strong> {bookingDetails.paymentMethod}
          </Card.Text>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Confirmation;
