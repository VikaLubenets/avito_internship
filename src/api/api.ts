import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../utils/constants';
import { FilmSearchResponse, IFilm } from '../store/types';
import dotenv from 'dotenv';
dotenv.config();

export const api = createApi({
  reducerPath: 'api',
	baseQuery: fetchBaseQuery({
		baseUrl: BASE_URL,
		headers: {
			"X-API-KEY": process.env.TOKEN || '',
			"Access-Control-Allow-Origin": "*",
			"Content-Type": "application/json",
		},
	}),
  endpoints: (builder) => ({
    getFilmDataById: builder.query<IFilm, number>({
      query: (itemId) => ({
        url: `/v1.4/movie/${itemId}`,
      }),
    }),
    getFilmData: builder.query<FilmSearchResponse, { page: number; limit: number; selectFields?: string }>({
      query: ({ page = 1, limit = 10, selectFields }) => {
        return {
          url: '/v1.4/movie',
          params: {
            page,
            limit,
            selectFields: selectFields || '',
          },
        };
      },
    }),
  }),
});

export const { useGetFilmDataByIdQuery, useGetFilmDataQuery } = api;
