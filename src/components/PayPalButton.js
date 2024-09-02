// PayPalButton.js

import React, { useEffect } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig'; // Make sure this is correctly exported from firebaseConfig

function PayPalButton() {
  useEffect(() => {
    window.paypal.Buttons({
      createOrder: function(data, actions) {
        return actions.order.create({
          purchase_units: [{
            amount: {
              value: '0.01' // Specify the amount to be paid
            }
          }]
        });
      },
      onApprove: async function(data, actions) {
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

        await addDoc(collection(db, 'payments'), paymentData);
      }
    }).render('#paypal-button-container');
  }, []);

  return (
    <div id="paypal-button-container"></div>
  );
}

export default PayPalButton;
