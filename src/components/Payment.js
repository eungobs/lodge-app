import { useState, useEffect, useCallback } from "react";
import { useLocation } from "react-router-dom";
import { Container, Form, Alert } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  startPayment,
  paymentSuccess,
  paymentFailed,
} from "../features/payment/paymentSlice";
import { db, auth } from "../firebase";
import { doc, setDoc } from "firebase/firestore";
import "./Payment.css";

const Payment = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const { paymentStatus, error } = useSelector((state) => state.payment);
  const [amount, setAmount] = useState(null);

  useEffect(() => {
    const bookingDetails = location.state?.bookingDetails;
    if (bookingDetails) {
      const accommodationPrice = parseFloat(bookingDetails.totalAmount);
      const checkInDate = new Date(bookingDetails.checkInDate);
      const checkOutDate = new Date(bookingDetails.checkOutDate);

      if (
        isNaN(checkInDate) ||
        isNaN(checkOutDate) ||
        isNaN(accommodationPrice)
      ) {
        console.error("Invalid booking details:", bookingDetails);
        dispatch(
          paymentFailed("Invalid booking details. Please try again.")
        );
        return;
      }

      const numberOfDays = Math.ceil(
        (checkOutDate - checkInDate) / (1000 * 60 * 60 * 24)
      );
      const totalAmount = accommodationPrice * Math.max(1, numberOfDays);
      setAmount(totalAmount.toFixed(2));
    }
  }, [location.state, dispatch]);

  const handlePayment = useCallback(
    async (details, orderId) => {
      dispatch(startPayment());
      try {
        const bookingId = `booking_${new Date().getTime()}`;
        const user = auth.currentUser;

        if (!user) {
          throw new Error("User not authenticated.");
        }

        await setDoc(doc(db, "bookings", bookingId), {
          userId: user.uid,
          bookingDetails: location.state?.bookingDetails || {},
          amount,
          orderId,
          status: "Confirmed",
          createdAt: new Date(),
        });

        dispatch(paymentSuccess());
      } catch (err) {
        console.error("Error saving booking:", err);
        dispatch(paymentFailed(err.message));
      }
    },
    [dispatch, amount, location.state?.bookingDetails]
  );

  useEffect(() => {
    let paypalButtons = null;

    const renderPayPalButtons = async () => {
      if (!window.paypal || !amount) return;

      try {
        paypalButtons = window.paypal.Buttons({
          createOrder: (data, actions) => {
            return actions.order.create({
              purchase_units: [
                {
                  amount: {
                    currency_code: "USD",
                    value: amount,
                  },
                },
              ],
            });
          },
          onApprove: async (data, actions) => {
            try {
              const details = await actions.order.capture();
              handlePayment(details, data.orderID);
            } catch (error) {
              console.error("Payment capture failed:", error);
              dispatch(paymentFailed("Payment capture failed."));
            }
          },
          onError: (err) => {
            console.error("PayPal error:", err);
            dispatch(paymentFailed("PayPal payment failed."));
          },
        });

        paypalButtons.render("#paypal-button-container");
      } catch (err) {
        console.error("Error rendering PayPal buttons:", err);
        dispatch(paymentFailed("Error setting up PayPal."));
      }
    };

    if (amount) {
      renderPayPalButtons();
    }

    return () => {
      if (paypalButtons && paypalButtons.close) {
        paypalButtons.close().then(() => {
          document.getElementById("paypal-button-container").innerHTML = "";
        });
      }
    };
  }, [amount, dispatch, handlePayment]);

  return (
    <Container className="mt-5">
      <h2 className="text-center">Payment</h2>

      {paymentStatus === "failed" && (
        <Alert variant="danger">{error}</Alert>
      )}
      {paymentStatus === "succeeded" && (
        <Alert variant="success">
          Payment successful! We can't wait to host you at our lodge.
        </Alert>
      )}

      {amount && (
        <>
          <Form.Group controlId="formAmount">
            <Form.Label>Amount (USD)</Form.Label>
            <Form.Control type="number" value={amount} readOnly />
          </Form.Group>
          <div id="paypal-button-container" className="mt-3"></div>
        </>
      )}

      {!amount && <p>Calculating amount...</p>}
    </Container>
  );
};

export default Payment;
