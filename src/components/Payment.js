import React, { useState, useEffect, useCallback } from 'react';
import { Container, Form, Alert } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { startPayment, paymentSuccess, paymentFailed } from '../features/payment/paymentSlice';
import { db, auth } from '../firebase';
import { doc, setDoc } from 'firebase/firestore';

const Payment = () => {
  const dispatch = useDispatch();
  const { paymentStatus, error } = useSelector((state) => state.payment);
  const [paymentMethod, setPaymentMethod] = useState('paypal');

  const handlePayment = useCallback(async (details) => {
    dispatch(startPayment());

    try {
      // Store booking details in Firestore
      const bookingId = new Date().getTime(); // Replace with your actual booking ID logic
      const user = auth.currentUser;

      if (user) {
        await setDoc(doc(db, 'bookings', `${bookingId}`), {
          userId: user.uid,
          bookingDetails: details, // Replace with actual booking details
          paymentMethod: paymentMethod,
          status: 'Confirmed',
          createdAt: new Date(),
        });

        dispatch(paymentSuccess());
        // Redirect to confirmation page or show success message
      } else {
        throw new Error('User is not authenticated.');
      }
    } catch (err) {
      dispatch(paymentFailed(err.message));
    }
  }, [dispatch, paymentMethod]);

  useEffect(() => {
    if (window.paypal) {
      window.paypal.Buttons({
        createOrder: (data, actions) => {
          return actions.order.create({
            purchase_units: [{
              amount: {
                value: '10.00', // Replace with dynamic amount
              },
            }],
          });
        },
        onApprove: async (data, actions) => {
          return actions.order.capture().then(async (details) => {
            handlePayment(details);
          });
        },
        onError: (err) => {
          dispatch(paymentFailed('PayPal payment failed.'));
        },
      }).render('#paypal-button-container');
    }
  }, [dispatch, handlePayment]);

  return (
    <Container className="mt-5">
      <h2 className="text-center">Payment</h2>
      {paymentStatus === 'failed' && <Alert variant="danger">{error}</Alert>}
      {paymentStatus === 'succeeded' && <Alert variant="success">Payment successful! We can't wait to host you at our lodge.</Alert>}
      <Form>
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
        <div id="paypal-button-container"></div>
      </Form>
    </Container>
  );
};

export default Payment;

