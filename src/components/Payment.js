import React, { useState, useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom'; // To access the passed state
import { Container, Form, Alert } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { startPayment, paymentSuccess, paymentFailed } from '../features/payment/paymentSlice';
import { db, auth } from '../firebase';
import { doc, setDoc } from 'firebase/firestore';
import './Payment.css';

const Payment = () => {
  const location = useLocation(); // This will access the passed state from BookNow
  const dispatch = useDispatch();
  const { paymentStatus, error } = useSelector((state) => state.payment);
  const [paymentMethod, setPaymentMethod] = useState('paypal');
  const [amount, setAmount] = useState(''); // Dynamic amount calculated

  // Calculate total amount based on the number of days
  useEffect(() => {
    const bookingDetails = location.state?.bookingDetails;
    if (bookingDetails) {
      const accommodationPrice = bookingDetails.totalAmount; // Assume this is the price per day
      const checkInDate = new Date(bookingDetails.checkInDate);
      const checkOutDate = new Date(bookingDetails.checkOutDate);
      const numberOfDays = Math.ceil((checkOutDate - checkInDate) / (1000 * 60 * 60 * 24)); // Calculate number of days
      const totalAmount = accommodationPrice * numberOfDays; // Calculate total amount
      setAmount(totalAmount.toFixed(2)); // Set amount in ZAR
    }
  }, [location.state]);

  // Handle Payment logic
  const handlePayment = useCallback(async (details) => {
    dispatch(startPayment());

    try {
      const bookingId = new Date().getTime(); // Unique booking ID
      const user = auth.currentUser;

      if (user) {
        await setDoc(doc(db, 'bookings', `${bookingId}`), {
          userId: user.uid,
          bookingDetails: location.state.bookingDetails, // Storing all booking details
          paymentMethod,
          amount, // Store the dynamic amount
          status: 'Confirmed',
          createdAt: new Date(),
        });

        dispatch(paymentSuccess());
      } else {
        throw new Error('User is not authenticated.');
      }
    } catch (err) {
      console.error('Error saving booking:', err.message);
      dispatch(paymentFailed(err.message));
    }
  }, [dispatch, paymentMethod, amount, location.state.bookingDetails]);

  // Load PayPal Button once
  useEffect(() => {
    const paypalButtonContainer = document.querySelector('#paypal-button-container');
    
    if (paypalButtonContainer && paypalButtonContainer.children.length === 0) {
      if (window.paypal) {
        window.paypal.Buttons({
          createOrder: (data, actions) => {
            return actions.order.create({
              purchase_units: [{
                amount: {
                  value: amount, // Dynamic amount
                },
              }],
            }).catch(err => {
              console.error('Error creating order:', err);
              dispatch(paymentFailed('Error creating PayPal order.'));
            });
          },
          onApprove: async (data, actions) => {
            try {
              const details = await actions.order.capture();
              handlePayment(details);
            } catch (err) {
              console.error('Error capturing order:', err);
              dispatch(paymentFailed('Error capturing PayPal order.'));
            }
          },
          onError: (err) => {
            console.error('PayPal error:', err);
            dispatch(paymentFailed('PayPal payment failed.'));
          },
        }).render('#paypal-button-container').catch((err) => {
          console.error('Error rendering PayPal buttons:', err);
          dispatch(paymentFailed('Error rendering PayPal buttons.'));
        });
      }
    }
  }, [amount, dispatch, handlePayment]);

  return (
    <Container className="mt-5">
      <h2 className="text-center">Payment</h2>
      {paymentStatus === 'failed' && <Alert variant="danger">{error}</Alert>}
      {paymentStatus === 'succeeded' && <Alert variant="success">Payment successful! We can't wait to host you at our lodge.</Alert>}
      <Form>
        <Form.Group controlId="formAmount">
          <Form.Label>Amount (ZAR)</Form.Label>
          <Form.Control
            type="number"
            value={amount}
            readOnly // Make amount read-only since it's calculated
          />
        </Form.Group>
        <Form.Group controlId="formPaymentMethod">
          <Form.Label>Select Payment Method</Form.Label>
          <Form.Check
            type="radio"
            label="PayPal"
            value="paypal"
            checked={paymentMethod === 'paypal'}
            onChange={(e) => setPaymentMethod(e.target.value)}
          />
        </Form.Group>
        <div id="paypal-button-container"></div> {/* PayPal button renders here */}
      </Form>
    </Container>
  );
};

export default Payment;
