import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppDispatch, FilmSearchResponse, filmsState } from '../types';

const initialState: filmsState = {
  searchResults: {} as FilmSearchResponse,
  savedTerm: '',
  totalCount: 10,
  currentPage: 1,
  limitPerPage: 10,
  totalPages: 1,
  error: null,
};

export const initializeSavedTerm = () => (dispatch: AppDispatch) => {
  const initialSavedTerm = localStorage.getItem('savedTerm');
  if (initialSavedTerm) {
    dispatch(filmsSlice.actions.setSavedTerm(initialSavedTerm));
  }
};

export const filmsSlice = createSlice({
  name: 'films',
  initialState,
  reducers: {
    setSavedTerm(state, action: PayloadAction<string>) {
      state.savedTerm = action.payload;
    },
    setSearchResults(state, action: PayloadAction<FilmSearchResponse>) {
      state.searchResults = action.payload;
    },
    setTotalCount(state, action: PayloadAction<number>) {
      state.totalCount = action.payload;
    },
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    setLimitPerPage(state, action: PayloadAction<number>) {
      state.limitPerPage = action.payload;
    },
    setTotalPages(state, action: PayloadAction<number>) {
      state.totalPages = action.payload;
    },
  },
});