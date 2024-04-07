import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../utils/constants';
import { AllGenresResponse, FilmSearchResponse, IFilm } from '../store/types';
import dotenv from 'dotenv';
dotenv.config();

const token = process.env.TOKEN || '';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    paramsSerializer: params => {
      const queryString = Object.keys(params)
        .map(key => {
          const value = params[key];
          if (Array.isArray(value)) {
            return value.map(val => `${encodeURIComponent(key)}=${encodeURIComponent(val)}`).join('&');
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
    getAllFilmsAndSeries: builder.query<
      FilmSearchResponse,
      { limit: number; page: number;}
    >({
      query: ({ limit = 10, page = 1 }) => {
        return {
          url: '/v1.4/movie',
          params: {
            page,
            limit,
            type: ['movie', 'tv-series']
          },
        }
      }
    }),
    getFilmDataByGenre: builder.query<
      FilmSearchResponse,
      { limit: number; genre: string; type?: string }
    >({
      query: ({ limit = 10, genre }) => {
        return {
          url: '/v1.4/movie',
          params: {
            page: 1,
            limit,
            "genres.name": genre,
          },
        };
      },
    }),
  }),
});

export const { 
  useGetFilmDataByIdQuery, 
  useGetAllFilmsAndSeriesQuery,
  useGetFilmDataByGenreQuery,
 } = api;
