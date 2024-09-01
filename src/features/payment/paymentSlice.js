// src/features/payment/paymentSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  paymentStatus: 'idle', // 'idle' | 'processing' | 'succeeded' | 'failed'
  error: null,
};

const paymentSlice = createSlice({
  name: 'payment',
  initialState,
  reducers: {
    startPayment(state) {
      state.paymentStatus = 'processing';
      state.error = null;
    },
    paymentSuccess(state) {
      state.paymentStatus = 'succeeded';
    },
    paymentFailed(state, action) {
      state.paymentStatus = 'failed';
      state.error = action.payload;
    },
    resetPayment(state) {
      state.paymentStatus = 'idle';
      state.error = null;
    },
  },
});

export const {
  startPayment,
  paymentSuccess,
  paymentFailed,
  resetPayment,
} = paymentSlice.actions;

export default paymentSlice.reducer;
