import React, { useEffect } from 'react';
import { Container, Card } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom'; // Import useNavigate
import { useSelector } from 'react-redux';
import { db } from "../firebase"; // Import Firestore
import { doc, setDoc } from "firebase/firestore"; // Import necessary Firestore functions

const Confirmation = () => {
  const location = useLocation();
  const navigate = useNavigate(); // Create a navigate function
  const { bookingDetails, bookingId } = location.state || {};
  const { user } = useSelector((state) => state.user);

  console.log('Location state:', location.state); // Debug log

  useEffect(() => {
    const saveBookingToFirestore = async () => {
      if (bookingDetails && bookingId && user) {
        // Create a receipt object
        const receiptData = {
          bookingId,
          name: bookingDetails.name,
          email: bookingDetails.email,
          accommodationId: bookingDetails.accommodationId,
          checkInDate: bookingDetails.checkInDate,
          checkOutDate: bookingDetails.checkOutDate,
          totalAmount: bookingDetails.totalAmount,
          paymentMethod: bookingDetails.paymentMethod,
          userId: user.uid, // Save the user ID for reference
        };

        // Save to Firestore under a 'receipts' collection
        await setDoc(doc(db, "receipts", bookingId), receiptData);
        console.log('Receipt saved to Firestore:', receiptData);
      }
    };

    saveBookingToFirestore();

    // Redirect to landing page after 3 seconds
    const timer = setTimeout(() => {
      navigate('/'); // Change this to your landing page route
    }, 3000);

    return () => clearTimeout(timer); // Cleanup timer on unmount
  }, [bookingDetails, bookingId, user, navigate]);

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
          <Card.Text style={{ color: 'green' }}> {/* Success message */}
            Payment Successful!
          </Card.Text>
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
