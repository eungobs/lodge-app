import { configureStore } from '@reduxjs/toolkit';
import userReducer from './features/userSlice';
import accommodationReducer from './features/accommodationsSlice'; // Ensure this path is correct

export const store = configureStore({
  reducer: {
    user: userReducer,
    accommodation: accommodationReducer  // Ensure this matches the name in your slice
  }
});

export default store;


