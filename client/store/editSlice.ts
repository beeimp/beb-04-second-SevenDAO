import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PostType } from '../types/post';

// Define the initial state using that type
const initialState: PostType = {
  _id: '',
  username: '',
  title: '',
  contents: '',
  tag: 'All',
  created_date: 0,
};

export const editSlice = createSlice({
  name: 'edit',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setUsername: (state, action: PayloadAction<string>) => {
      state.username = action.payload;
    },
    setTitle: (state, action: PayloadAction<string>) => {
      state.title = action.payload;
    },
    setContent: (state, action: PayloadAction<string>) => {
      state.contents = action.payload;
    },
    setTag: (
      state,
      action: PayloadAction<'All' | 'Programming' | 'Media' | 'Technology' | 'Community' | 'Others'>
    ) => {
      state.tag = action.payload;
    },
  },
});

export const editActions = { ...editSlice.actions };
