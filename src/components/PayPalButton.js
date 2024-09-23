import React, { useEffect } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig'; // Ensure this is correctly exported from firebaseConfig

function PayPalButton() {
  useEffect(() => {
    // Check if PayPal SDK is available
    if (window.paypal) {
      window.paypal.Buttons({
        createOrder: function (data, actions) {
          return actions.order.create({
            purchase_units: [{
              amount: {
                value: '0.01' // Specify the amount to be paid
              }
            }]
          });
        },
        onApprove: async function (data, actions) {
          try {
            const details = await actions.order.capture();
            alert('Transaction completed by ' + details.payer.name.given_name);

            // Store the payment details in Firebase Firestore
            const paymentData = {
              name: details.payer.name.given_name,
              email: details.payer.email_address,
              amount: details.purchase_units[0].amount.value,
              orderId: data.orderID,
              createdAt: new Date(),
            };

            // Save payment details to Firestore
            await addDoc(collection(db, 'payments'), paymentData);
            alert('Payment details successfully saved to Firestore');
          } catch (error) {
            console.error('Error capturing PayPal order or saving to Firestore:', error);
            alert('Payment failed or could not save details.');
          }
        },
        onError: function (err) {
          console.error('PayPal Button Error:', err);
          alert('An error occurred with PayPal. Please try again later.');
        }
      }).render('#paypal-button-container');
    } else {
      console.error('PayPal SDK not loaded.');
    }
  }, []);

  return (
    <div id="paypal-button-container"></div>
  );
}

export default PayPalButton;
