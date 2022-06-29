import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define a type for the slice state
interface ModalSlice {
  displayTransfer: boolean;
}

// Define the initial state using that type
const initialState: ModalSlice = {
  displayTransfer: false,
};

export const modalSlice = createSlice({
  name: 'modal',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setDisplayTransfer: (state, action: PayloadAction<boolean>) => {
      state.displayTransfer = action.payload;
    },
  },
});

export const modalActions = { ...modalSlice.actions };
