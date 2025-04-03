"use client"

import { useEffect } from "react"
import { collection, addDoc } from "firebase/firestore"
import { db } from "../firebaseConfig"

function PayPalButton() {
  useEffect(() => {
    // Clear any existing PayPal buttons to prevent duplicates
    const container = document.getElementById("paypal-button-container")
    if (container) {
      container.innerHTML = ""
    }

    // Check if PayPal SDK is available
    if (window.paypal) {
      window.paypal
        .Buttons({
          // Create order function must return a promise that resolves to an order ID
          createOrder: (data, actions) =>
            actions.order.create({
              purchase_units: [
                {
                  amount: {
                    value: "0.01", // Specify the amount to be paid
                  },
                },
              ],
            }),
          onApprove: async (data, actions) => {
            try {
              // Important: data.orderID contains the order ID
              console.log("Order approved with ID:", data.orderID)

              // Capture the funds from the transaction
              const details = await actions.order.capture()
              console.log("Transaction completed:", details)

              alert("Transaction completed by " + details.payer.name.given_name)

              // Store the payment details in Firebase Firestore
              const paymentData = {
                name: details.payer.name.given_name,
                email: details.payer.email_address,
                amount: details.purchase_units[0].amount.value,
                orderId: data.orderID, // Store the order ID
                createdAt: new Date(),
              }

              // Save payment details to Firestore
              await addDoc(collection(db, "payments"), paymentData)
              alert("Payment details successfully saved to Firestore")
            } catch (error) {
              console.error("Error capturing PayPal order or saving to Firestore:", error)
              alert("Payment failed or could not save details.")
            }
          },
          onError: (err) => {
            console.error("PayPal Button Error:", err)
            alert("An error occurred with PayPal. Please try again later.")
          },
        })
        .render("#paypal-button-container")
    } else {
      console.error("PayPal SDK not loaded.")
    }

    // Cleanup function to prevent memory leaks
    return () => {
      const container = document.getElementById("paypal-button-container")
      if (container) {
        container.innerHTML = ""
      }
    }
  }, []) // Empty dependency array ensures this runs only once

  return <div id="paypal-button-container"></div>
}

export default PayPalButton


