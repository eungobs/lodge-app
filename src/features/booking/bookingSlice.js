// src/features/booking/bookingSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  bookingId: null,
  // other state fields
};

const bookingSlice = createSlice({
  name: 'booking',
  initialState,
  reducers: {
    setAccommodation: (state, action) => {
      // implementation
    },
    setCheckInDate: (state, action) => {
      // implementation
    },
    setCheckOutDate: (state, action) => {
      // implementation
    },
    setEmail: (state, action) => {
      // implementation
    },
    setName: (state, action) => {
      // implementation
    },
    setPaymentMethod: (state, action) => {
      // implementation
    },
    setTotalAmount: (state, action) => {
      // implementation
    },
    setBookingId: (state, action) => {
      state.bookingId = action.payload;
    },
    resetBooking: (state) => {
      state.bookingId = null;
      // reset other fields if necessary
    },
  },
});

export const { 
  setAccommodation, 
  setCheckInDate, 
  setCheckOutDate, 
  setEmail, 
  setName, 
  setPaymentMethod, 
  setTotalAmount, 
  setBookingId, 
  resetBooking 
} = bookingSlice.actions;

export default bookingSlice.reducer;

