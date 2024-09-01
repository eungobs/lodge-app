// features/accommodationActions.js
import { createAsyncThunk } from '@reduxjs/toolkit';
import { getAccommodationFromFirebase } from '../firebase'; // Adjust the path as needed

export const fetchAccommodation = createAsyncThunk(
  'accommodation/fetchAccommodation',
  async (id, { rejectWithValue }) => {
    try {
      const accommodation = await getAccommodationFromFirebase(id);
      return accommodation; // This is returned as the action payload
    } catch (error) {
      return rejectWithValue(error.message); // Error handling
    }
  }
);
