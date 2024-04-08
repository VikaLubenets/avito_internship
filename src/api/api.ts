import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL, DEFAULT_LIMIT_FILMS_PER_PAGE, DEFAULT_PAGE } from '../utils/constants';
import { FilmSearchResponse, IFilm } from '../store/types';
import dotenv from 'dotenv';
dotenv.config();

const token = process.env.TOKEN || '';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    paramsSerializer: (params) => {
      const queryString = Object.keys(params)
        .map((key) => {
          const value = params[key];
          if (Array.isArray(value)) {
            return value
              .map((val) => `${encodeURIComponent(key)}=${encodeURIComponent(val)}`)
              .join('&');
          }
          return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
        })
        .join('&');
      return queryString;
    },
    headers: {
      'X-API-KEY': token,
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
    },
  }),
  endpoints: (builder) => ({
    getFilmDataById: builder.query<IFilm, number>({
      query: (itemId) => ({
        url: `/v1.4/movie/${itemId}`,
      }),
    }),
    getAllFilmsAndSeries: builder.query<FilmSearchResponse, {
      limit: number;
      page: number;
      params?: Record<string, string>;
    }>({
      query: ({ limit = DEFAULT_LIMIT_FILMS_PER_PAGE, page = DEFAULT_PAGE, params }) => {
        return {
          url: '/v1.4/movie',
          params: {
            page,
            limit,
            type: ['movie', 'tv-series'],
            ...params,
          },
        };
      },
    }),
    getSearchFilms: builder.query<FilmSearchResponse, {
      limit: number;
      page: number;
      query: string;
    }>({
      query: ({ limit = DEFAULT_LIMIT_FILMS_PER_PAGE, page = DEFAULT_PAGE, query }) => {
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
  }),
});

export const {
  useGetFilmDataByIdQuery,
  useGetAllFilmsAndSeriesQuery,
  useGetSearchFilmsQuery,
} = api;