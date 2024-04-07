import { configureStore } from '@reduxjs/toolkit';
import { api } from '../api/api';
import { filmsSlice } from './reducers/filmsReducer';

export const setupStore = () => {
  return configureStore({
    reducer: {
      films: filmsSlice.reducer,
      [api.reducerPath]: api.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(api.middleware),
  });
};
