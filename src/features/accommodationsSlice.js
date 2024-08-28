import { createSlice } from '@reduxjs/toolkit';

export const accommodationsSlice = createSlice({
  name: 'accommodations',
  initialState: {
    list: []
  },
  reducers: {
    setAccommodations: (state, action) => {
      state.list = action.payload;
    }
  }
});

export const { setAccommodations } = accommodationsSlice.actions;
export default accommodationsSlice.reducer;
