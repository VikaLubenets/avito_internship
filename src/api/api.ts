import { createApi } from '@reduxjs/toolkit/query/react';
import {
  DEFAULT_LIMIT_FILMS_PER_PAGE,
  DEFAULT_PAGE,
  DEFAULT_POSTERS_PER_PAGE,
  DEFAULT_REVIEWS_PER_PAGE,
  DEFAULT_SEASONS_PER_PAGE,
} from '../utils/constants';
import {
  FilmSearchResponse,
  IFilm,
  PostersResponse,
  ReviewResponse,
  SeasonsResponse,
} from '../store/types';
import { staggeredBaseQuery } from './config/staggeredBaseQuery';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: staggeredBaseQuery,
  refetchOnReconnect: true,
  endpoints: (builder) => ({
    getFilmDataById: builder.query<IFilm, number>({
      query: (itemId) => ({
        url: `/v1.4/movie/${itemId}`,
      }),
    }),
    getAllFilmsAndSeries: builder.query<
      FilmSearchResponse,
      {
        params?: { [key: string]: string };
      }
    >({
      query: ({ params }) => {
        return {
          url: '/v1.4/movie',
          params: {
            type: ['movie', 'tv-series'],
            ...params,
          },
        };
      },
    }),
    getSearchFilms: builder.query<
      FilmSearchResponse,
      {
        query: string;
        limit?: number;
        page?: number;
      }
    >({
      query: ({
        query,
        page = DEFAULT_PAGE,
        limit = DEFAULT_LIMIT_FILMS_PER_PAGE,
      }) => {
        return {
          url: `/v1.4/movie/search`,
          params: {
            page,
            limit,
            query,
          },
        };
      },
    }),
    getReviews: builder.query<
      ReviewResponse,
      {
        page?: number;
        limit?: number;
        movieId: string;
      }
    >({
      query: ({
        page = DEFAULT_PAGE,
        limit = DEFAULT_REVIEWS_PER_PAGE,
        movieId,
      }) => {
        return {
          url: `v1.4/review`,
          params: {
            page,
            limit,
            movieId,
          },
        };
      },
    }),
    getPosters: builder.query<
      PostersResponse,
      {
        page?: number;
        limit?: number;
        movieId: string;
      }
    >({
      query: ({
        page = DEFAULT_PAGE,
        limit = DEFAULT_POSTERS_PER_PAGE,
        movieId,
      }) => {
        return {
          url: `v1.4/image`,
          params: {
            page,
            limit,
            movieId,
          },
        };
      },
    }),
    getSeasons: builder.query<
      SeasonsResponse,
      {
        page?: number;
        limit?: number;
        number?: number;
        movieId: string;
      }
    >({
      query: ({
        page = DEFAULT_PAGE,
        limit = DEFAULT_SEASONS_PER_PAGE,
        movieId,
      }) => {
        return {
          url: `v1.4/season`,
          params: {
            page,
            limit,
            movieId,
          },
        };
      },
    }),
    getRandomFilm: builder.query<IFilm, { params?: Record<string, string[]> }>({
      query: ({ params }) => {
        return {
          url: 'v1.4/movie/random',
          params,
        };
      },
    }),
  }),
});

export const {
  useGetFilmDataByIdQuery,
  useGetAllFilmsAndSeriesQuery,
  useGetSearchFilmsQuery,
  useGetReviewsQuery,
  useGetPostersQuery,
  useGetSeasonsQuery,
  useLazyGetRandomFilmQuery,
} = api;
