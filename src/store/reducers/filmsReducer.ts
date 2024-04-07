import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AllGenresResponse, AppDispatch, FilmSearchResponse, filmsState, IFilm } from '../types';

const initialState: filmsState = {
  films: {} as IFilm[],
  savedTerm: '',
  totalCount: 10,
  currentPage: 1,
  limitPerPage: 10,
  totalPages: 1,
  error: null,
  genres: [],
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
    setFilms(state, action: PayloadAction<IFilm[]>) {
      state.films = action.payload;
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
    setGenres(state, action: PayloadAction<AllGenresResponse>) {
      state.genres = action.payload;
    },
  },
});
