import { createSlice } from '@reduxjs/toolkit';
import { Stats } from 'fs';

export interface Props {
  username: string;
  email: string;
  password: string;
}

const initialState: Props = {
  username: '',
  email: '',
  password: '',
};

const signupSlice = createSlice({
  name: 'signup',
  initialState,
  reducers: {
    setUsername(state, action) {
      state.username = action.payload;
    },
    setEmail(state, action) {
      state.email = action.payload;
    },
    setPassword(state, action) {
      state.password = action.payload;
    },
  },
});

export const signupActions = { ...signupSlice.actions };

export default signupSlice;
