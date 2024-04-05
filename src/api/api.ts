import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../utils/constants';
import dotenv from 'dotenv';
dotenv.config();

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers) => {
      headers.set('X-API-KEY', process.env.API_TOKEN || '');
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getFilmDataById: builder.query({
      query: (itemId) => ({
        url: `/v1.4/movie/${itemId}`,
      }),
    }),
    getAllFilmData: builder.query({
      query: () => ({
        url: '/v1.4/movie',
      }),
    }),
  }),
});

export const { useGetFilmDataByIdQuery, useGetAllFilmDataQuery } = api;
