// src/Booking.js
import React, { useState } from "react";
import { db } from "./firebaseConfig";
import { collection, addDoc } from "firebase/firestore";

const Booking = ({ accommodationId }) => {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(1);

  const handleBooking = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "bookings"), {
        accommodationId,
        checkIn,
        checkOut,
        guests,
      });
      alert("Booking successful!");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div>
      <h2>Book Accommodation</h2>
      <form onSubmit={handleBooking}>
        <input
          type="date"
          value={checkIn}
          onChange={(e) => setCheckIn(e.target.value)}
          placeholder="Check-in Date"
        />
        <input
          type="date"
          value={checkOut}
          onChange={(e) => setCheckOut(e.target.value)}
          placeholder="Check-out Date"
        />
        <input
          type="number"
          value={guests}
          onChange={(e) => setGuests(e.target.value)}
          placeholder="Number of Guests"
        />
        <button type="submit">Book Now</button>
      </form>
    </div>
  );
};

export default Booking;
