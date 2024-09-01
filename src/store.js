import { configureStore } from '@reduxjs/toolkit';
import userReducer from './features/userSlice'; // Adjust path if necessary
import accommodationReducer from './features/accommodationsSlice'; // Adjust path if necessary
import paymentReducer from './features/payment/paymentSlice'; // Adjust path
import bookingReducer from './features/booking/bookingSlice'; // Adjust path

export const store = configureStore({
  reducer: {
    user: userReducer,
    accommodation: accommodationReducer,
    payment: paymentReducer,
    booking: bookingReducer,
  },
});

export default store;



