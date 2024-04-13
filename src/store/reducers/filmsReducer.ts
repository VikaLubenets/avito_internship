import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '..';
import { DEFAULT_LIMIT_FILMS_PER_PAGE } from '../../utils/constants';
import {
  filmsState,
  FilterPayload,
  FilterType,
  RandomFilmType,
  RandomFilterString,
} from '../types';

const initialState: filmsState = {
  totalCount: 10,
  currentPage: 1,
  limitPerPage: DEFAULT_LIMIT_FILMS_PER_PAGE,
  totalPages: 1,
  search: '',
  filters: [],
  isLoading: false,
  error: null,
  searchHistory: [],
  searchSuggestions: [],
  pageActors: 1,
  pageReviews: 1,
  pageSeasons: 1,
  pagePosters: 1,
  randomFilmFilters: [],
};

export const filmsSlice = createSlice({
  name: 'films',
  initialState,
  reducers: {
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
    setIsLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
    setSearchHistory(state, action: PayloadAction<string>) {
      state.searchHistory.push(action.payload);
      if (state.searchHistory.length > 20) {
          state.searchHistory.shift();
      }
    },
    setSearchSuggestions(state, action: PayloadAction<string[]>) {
      state.searchSuggestions = action.payload;
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
    addOrUpdateFilter(state, action: PayloadAction<FilterPayload>) {
      return { ...state, filters: [...state.filters, action.payload] };
    },
    removeFilter(state, action: PayloadAction<FilterType>) {
      state.filters = state.filters.filter((item) => item.type !== action.payload);
    },
    resetFilters(state, action: PayloadAction<[]>) {
      state.filters = [];
    },
    addOrUpdateRandomFilter(state, action: PayloadAction<RandomFilterString>) {
      const newFilter = action.payload;
      const filterHasValues = Object.values(newFilter).some(
        (values) => values.length > 0
      );

      if (!filterHasValues) {
        const filterType = Object.keys(newFilter)[0];
        state.randomFilmFilters = state.randomFilmFilters.filter(
          (filter) => Object.keys(filter)[0] !== filterType
        );
        return;
      }

      const existingIndex = state.randomFilmFilters.findIndex(
        (filter) => Object.keys(filter)[0] === Object.keys(newFilter)[0]
      );

      if (existingIndex !== -1) {
        state.randomFilmFilters[existingIndex] = newFilter;
      } else {
        state.randomFilmFilters.push(newFilter);
      }
    },
    removeRandomFilter(state, action: PayloadAction<RandomFilmType>) {
      state.randomFilmFilters = state.randomFilmFilters.filter(
        (filter) => Object.keys(filter)[0] !== action.payload
    );
    },
    resetRandomFilters(state) {
      state.randomFilmFilters = [];
    },
  },
});

export const selectNormalizedFilterOptions = createSelector(
  [(state: RootState) => state.films.filters],
  (filters) => {
    const paramsArray = filters
      .filter((option) => option.value !== null)
      .map((option) => Object.entries(option.value!))
      .flat();
    return Object.fromEntries(paramsArray);
  }
);
