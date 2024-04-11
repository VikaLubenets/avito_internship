import { configureStore } from '@reduxjs/toolkit';
import { api } from '../api/api';
import { filmsSlice } from './reducers/filmsReducer';
import { loginSlice } from './reducers/loginReducer';
import { userSlice } from './reducers/userReducer';

const setupStore = () => {
  return configureStore({
    reducer: {
      films: filmsSlice.reducer,
      login: loginSlice.reducer,
      user: userSlice.reducer,
      [api.reducerPath]: api.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(api.middleware),
  });
};


const store = setupStore();
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store;