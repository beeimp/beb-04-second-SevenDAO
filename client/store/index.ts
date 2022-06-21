import { configureStore, createSerializableStateInvariantMiddleware } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';

const serializableMiddleware = createSerializableStateInvariantMiddleware({
  getEntries: () => [],
});

const store = () =>
  configureStore({
    reducer: {},
    middleware: [serializableMiddleware],
    devTools: process.env.NODE_ENV !== 'production',
  });

export const wrapper = createWrapper(store, {
  debug: process.env.NODE_ENV !== 'production',
});
