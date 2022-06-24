import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CommentWriteType } from '../types/comment';

// Define the initial state using that type
const initialState: CommentWriteType = {
  postId: '',
  username: '',
  comment: '',
};

export const commentWriteSlice = createSlice({
  name: 'commentWrite',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setPostId: (state, action: PayloadAction<string>) => {
      state.postId = action.payload;
    },
    setUsername: (state, action: PayloadAction<string>) => {
      state.username = action.payload;
    },
    setComment: (state, action: PayloadAction<string>) => {
      state.comment = action.payload;
    },
  },
});

export const commentWriteActions = { ...commentWriteSlice.actions };
