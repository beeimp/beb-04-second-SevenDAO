import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthType } from '../types/post';

// Define the initial state using that type
const initialState: AuthType = {
  username: '',
  isAuth: false,
  errorMessage: '',
};

export const authSlice = createSlice({
  name: 'auth',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    successAuth: (state, action: PayloadAction<string>) => {
      state.username = action.payload;
      state.isAuth = true;
    },
    failureAuth: (state, action: PayloadAction<string>) => {
      state.username = '';
      state.isAuth = false;
      state.errorMessage = action.payload;
    },
  },
});

export const authActions = { ...authSlice.actions };
