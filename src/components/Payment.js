// src/components/Payment.js
import React, { useState } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  startPayment,
  paymentSuccess,
  paymentFailed,
} from '../features/payment/paymentSlice';
import { setBookingId, resetBooking } from '../features/booking/bookingSlice';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { v4 as uuidv4 } from 'uuid';

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { bookingDetails } = location.state || {}; // Extract booking details from state

  const { paymentStatus, error } = useSelector((state) => state.payment);

  const [paymentMethod, setPaymentMethod] = useState('bankTransfer');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCVV, setCardCVV] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [reference, setReference] = useState('');
  const [paymentMessage, setPaymentMessage] = useState('');

  const db = getFirestore(); // Initialize Firestore
  const auth = getAuth(); // Initialize Firebase Auth

  const handlePayment = async (e) => {
    e.preventDefault();

    if (!bookingDetails) {
      dispatch(paymentFailed('No booking details found. Please go back and book again.'));
      return;
    }

    const currentUser = auth.currentUser;
    if (!currentUser) {
      dispatch(paymentFailed('You must be logged in to complete the payment.'));
      return;
    }

    dispatch(startPayment());

    // Simulate payment processing logic (replace with real integration)
    let paymentSuccessFlag = false;

    try {
      if (paymentMethod === 'card') {
        if (!cardNumber || !cardExpiry || !cardCVV) {
          throw new Error('Please fill in all card details.');
        }
        paymentSuccessFlag = processCardPayment(cardNumber, cardExpiry, cardCVV);
      } else if (paymentMethod === 'bankTransfer') {
        if (!accountNumber || !reference) {
          throw new Error('Please fill in all bank transfer details.');
        }
        paymentSuccessFlag = processBankPayment(accountNumber, reference);
      }

      if (paymentSuccessFlag) {
        // Store booking details in Firestore
        const bookingId = uuidv4();
        await setDoc(doc(db, 'bookings', bookingId), {
          userId: currentUser.uid,
          bookingDetails,
          paymentMethod,
          status: 'Confirmed',
          createdAt: new Date(),
        });

        dispatch(setBookingId(bookingId)); // Update booking ID in state
        dispatch(paymentSuccess());

        // Reset booking state if necessary
        dispatch(resetBooking());

        // Set custom success message
        setPaymentMessage('Payment successful! We can’t wait to host you at our lodge.');

        // Redirect to confirmation page after a short delay to show the message
        setTimeout(() => {
          navigate('/confirmation', { state: { bookingDetails, bookingId } });
        }, 2000); // 2 seconds delay
      } else {
        throw new Error('Payment processing failed.');
      }
    } catch (err) {
      dispatch(paymentFailed(err.message));
    }
  };

  const processCardPayment = (number, expiry, cvv) => {
    // Placeholder for real payment processing logic
    console.log('Processing card payment', { number, expiry, cvv });
    // Implement real payment gateway integration here
    return true; // Return true if successful
  };

  const processBankPayment = (accountNumber, reference) => {
    // Placeholder for real bank payment processing logic
    console.log('Processing bank payment', { accountNumber, reference });
    // Implement real bank payment integration here
    return true; // Return true if successful
  };

  return (
    <Container className="mt-5">
      <h2 className="text-center">Payment</h2>
      <p className="text-center">
        Total Amount: ${bookingDetails?.totalAmount || 'N/A'}
      </p>

      {paymentStatus === 'failed' && <Alert variant="danger">{error}</Alert>}
      {paymentStatus === 'succeeded' && paymentMessage && (
        <Alert variant="success">{paymentMessage}</Alert>
      )}

      <Form onSubmit={handlePayment}>
        <Form.Group controlId="formPaymentMethod">
          <Form.Label>Select Payment Method</Form.Label>
          <Form.Check
            type="radio"
            label="Bank Transfer"
            value="bankTransfer"
            checked={paymentMethod === 'bankTransfer'}
            onChange={(e) => setPaymentMethod(e.target.value)}
          />
          <Form.Check
            type="radio"
            label="MasterCard/Credit Card"
            value="card"
            checked={paymentMethod === 'card'}
            onChange={(e) => setPaymentMethod(e.target.value)}
          />
        </Form.Group>

        {paymentMethod === 'card' && (
          <>
            <Form.Group controlId="formCardNumber">
              <Form.Label>Card Number</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter card number"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="formCardExpiry">
              <Form.Label>Expiry Date</Form.Label>
              <Form.Control
                type="text"
                placeholder="MM/YY"
                value={cardExpiry}
                onChange={(e) => setCardExpiry(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="formCardCVV">
              <Form.Label>CVV</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter CVV"
                value={cardCVV}
                onChange={(e) => setCardCVV(e.target.value)}
                required
              />
            </Form.Group>
          </>
        )}

        {paymentMethod === 'bankTransfer' && (
          <>
            <Form.Group controlId="formAccountNumber">
              <Form.Label>Account Number</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter account number"
                value={accountNumber}
                onChange={(e) => setAccountNumber(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="formReference">
              <Form.Label>Reference</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter reference"
                value={reference}
                onChange={(e) => setReference(e.target.value)}
                required
              />
            </Form.Group>
          </>
        )}

        <Button variant="primary" type="submit" className="mt-3" disabled={paymentStatus === 'processing'}>
          {paymentStatus === 'processing' ? 'Processing...' : 'Pay Now'}
        </Button>
      </Form>
    </Container>
  );
};

export default Payment;

