import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DEFAULT_LIMIT_FILMS_PER_PAGE } from '../../utils/constants';
import { filmsState, FilterString, IFilm } from '../types';

const initialState: filmsState = {
  films: {} as IFilm[],
  totalCount: 10,
  currentPage: 1,
  limitPerPage: DEFAULT_LIMIT_FILMS_PER_PAGE,
  totalPages: 1,
  search: '',
  year: '',
  country: '',
  ageRating: '',
  filter: null,
  isLoading: false,
  error: null,
  pageActors: 1,
  pageReviews: 1,
  pageSeasons: 1,
  pagePosters: 1,
};

export const filmsSlice = createSlice({
  name: 'films',
  initialState,
  reducers: {
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
    setSearch(state, action: PayloadAction<string>) {
      state.search = action.payload;
    },
    setYear(state, action: PayloadAction<string>) {
      state.year = action.payload;
    },
    setCountry(state, action: PayloadAction<string>) {
      state.country = action.payload;
    },
    setAgeRating(state, action: PayloadAction<string>) {
      state.ageRating = action.payload;
    },
    setFilter(state, action: PayloadAction<FilterString>) {
      state.filter = action.payload;
    },
    setIsLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
    setPageActors(state, action: PayloadAction<number>) {
      state.pageActors = action.payload;
    },
    setPageReviews(state, action: PayloadAction<number>) {
      state.pageReviews = action.payload;
    },
    setPageSeasons(state, action: PayloadAction<number>) {
      state.pageSeasons = action.payload;
    },
    setPagePosters(state, action: PayloadAction<number>) {
      state.pagePosters = action.payload;
    },
  },
});
