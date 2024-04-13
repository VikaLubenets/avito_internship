import {  fetchBaseQuery, retry } from '@reduxjs/toolkit/query/react';
import {
  BASE_URL,
} from '../../utils/constants';

const token = process.env.TOKEN || '';

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  paramsSerializer: (params) => {
    const queryString = Object.keys(params)
      .map((key) => {
        const value = params[key];
        if (Array.isArray(value)) {
          return value
            .map(
              (val) => `${encodeURIComponent(key)}=${encodeURIComponent(val)}`
            )
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
});

export const staggeredBaseQuery = retry(baseQuery, {
  maxRetries: 3,
});