import { configureStore } from '@reduxjs/toolkit';
import userReducer from './features/userSlice';
import accommodationsReducer from './features/accommodationsSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    accommodations: accommodationsReducer
  }
});
