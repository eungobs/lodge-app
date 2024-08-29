// features/userActions.js
import { createAsyncThunk } from '@reduxjs/toolkit';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

export const loginUser = createAsyncThunk(
  'user/loginUser',
  async ({ email, password }, { rejectWithValue }) => {
    const auth = getAuth();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      return {
        email: user.email,
        uid: user.uid,
        // Add other properties if needed
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

