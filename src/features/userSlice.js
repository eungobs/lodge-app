// features/userSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { loginUser } from './userActions';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,
    error: null,
    status: 'idle',
  },
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
    logout(state) {
      state.user = null;
      state.error = null;
      state.status = 'idle';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        console.log('User data on login:', action.payload); // Debug log
        state.user = action.payload;
        state.status = 'succeeded';
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.error = action.payload;
        state.status = 'failed';
      });
  },
});

export const { setUser, logout } = userSlice.actions;
export default userSlice.reducer;


