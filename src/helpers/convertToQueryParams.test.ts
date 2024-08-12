import { convertToQueryParams } from './convertToQueryParams';
import { RandomFilmFiltersPayload } from '../store/types';

describe('convertToQueryParams', () => {
  it('returns an empty object for an empty array of filters', () => {
    const filters: RandomFilmFiltersPayload = [];
    const result = convertToQueryParams(filters);
    expect(result).toEqual({});
  });

  it('converts a single filter to query params', () => {
    const filters: RandomFilmFiltersPayload = [{ year: ['2022'] }];
    const result = convertToQueryParams(filters);
    expect(result).toEqual({ year: ['2022'] });
  });

  it('converts multiple filters to query params', () => {
    const filters: RandomFilmFiltersPayload = [
      { year: ['2022'] },
      { 'countries.name': ['USA'] },
    ];
    const result = convertToQueryParams(filters);
    expect(result).toEqual({
      year: ['2022'],
      'countries.name': ['USA'],
    });
  });

  it('converts multiple values for one filter to query params', () => {
    const filters: RandomFilmFiltersPayload = [
      { 'genres.name': ['action', 'drama'] },
    ];
    const result = convertToQueryParams(filters);
    expect(result).toEqual({
      'genres.name': ['action', 'drama'],
    });
  });
});
