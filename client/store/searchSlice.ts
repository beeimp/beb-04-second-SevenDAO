import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SearchType } from '../types/post';

// Define the initial state using that type
const initialState: SearchType = {
  searchWord: '',
  recentSearchArr: [],
};

export const searchSlice = createSlice({
  name: 'search',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setSearchword: (state, action: PayloadAction<string>) => {
      state.searchWord = action.payload;
    },
    addRecentSearchArr: (state, action: PayloadAction<string>) => {
      state.recentSearchArr = [action.payload, ...state.recentSearchArr];
    },
  },
});

export const searchActions = { ...searchSlice.actions };
