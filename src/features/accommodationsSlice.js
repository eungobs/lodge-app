// src/features/accommodationsSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getAccommodationFromFirebase } from '../firebase';

// Async thunk for fetching accommodations
export const fetchAccommodations = createAsyncThunk(
  'accommodations/fetchAccommodations',
  async (_, { rejectWithValue }) => {
    try {
      const accommodations = await getAccommodationFromFirebase();
      return accommodations;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const accommodationsSlice = createSlice({
  name: 'accommodations',
  initialState: {
    list: [],
    status: 'idle',
    error: null
  },
  reducers: {
    // Define and export the setAccommodations action
    setAccommodations: (state, action) => {
      state.list = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAccommodations.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAccommodations.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.list = action.payload;
      })
      .addCase(fetchAccommodations.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  }
});

export const { setAccommodations } = accommodationsSlice.actions;
export default accommodationsSlice.reducer;

