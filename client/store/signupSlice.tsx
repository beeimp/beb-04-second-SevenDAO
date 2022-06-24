import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SingupState {
  username: string;
  email: string;
  password: string;
}

const initialState: SingupState = {
  username: '',
  email: '',
  password: '',
};

export const signupSlice = createSlice({
  name: 'signup',
  initialState,
  reducers: {
    setUsername(state, action: PayloadAction<string>) {
      state.username = action.payload;
    },
    setEmail(state, action: PayloadAction<string>) {
      state.email = action.payload;
    },
    setPassword(state, action: PayloadAction<string>) {
      state.password = action.payload;
    },
  },
});

export const signupActions = { ...signupSlice.actions };
