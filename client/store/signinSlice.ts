import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define a type for the slice state
interface SignInState {
  username: string;
  password: string;
}

// Define the initial state using that type
const initialState: SignInState = {
  username: '',
  password: '',
};

export const signinSlice = createSlice({
  name: 'signin',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setUsername: (state, action: PayloadAction<string>) => {
      state.username = action.payload;
    },
    setPassword: (state, action: PayloadAction<string>) => {
      state.password = action.payload;
    },
  },
});

export const signinActions = { ...signinSlice.actions };
