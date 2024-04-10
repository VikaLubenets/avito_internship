import { useCallback, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Select from '../../../ui/select';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks/redux';
import { filmsSlice, selectNormalizedFilterOptions } from '../../../../store/reducers/filmsReducer';
import './FiltersBar.scss';
import { ageRanking } from './configs/AgeRanking';
import { countries } from './configs/Countries';
import { years } from './configs/Years';
import { FilterPayload, FilterString } from '../../../../store/types';
import {
  DEFAULT_LIMIT_FILMS_PER_PAGE,
  DEFAULT_PAGE,
} from '../../../../utils/constants';
import { X } from 'lucide-react';
import { Tooltip } from 'react-tooltip';
import { useGetAllFilmsAndSeriesQuery } from '../../../../api/api';

const FiltersBar = () => {
  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useSearchParams();

  const limit = searchParams.get('limit');
  const page = searchParams.get('page');
  const selectedYear = searchParams.get('year') || '';
  const selectedCountry = searchParams.get('country') || '';
  const selectedAgeRating = searchParams.get('ageRating') || '';

  const search = useAppSelector((state) => state.films.search);

  const filterOptions = useAppSelector(selectNormalizedFilterOptions);

  useEffect(() => {
    setSearchParams(() => ({
      page: String(DEFAULT_PAGE),
      limit: String(DEFAULT_LIMIT_FILMS_PER_PAGE),
      ...filterOptions
    }));
  }, [filterOptions, setSearchParams]);

  const handleYearSelect = useCallback(
    (val: string) => {
      if(val === 'reset'){
        dispatch(filmsSlice.actions.removeFilter('year'));
      } else {
        const { data } = useGetAllFilmsAndSeriesQuery({});
        dispatch(filmsSlice.actions.addOrUpdateFilter({
          type: 'year',
          value: { year: val } as FilterString
        }));
      }
    },
    [dispatch]
  );

  const handleCountrySelect = useCallback(
    (val: string) => {
      if(val === 'reset'){
        dispatch(filmsSlice.actions.removeFilter('countries.name'));
      } else {
        dispatch(filmsSlice.actions.addOrUpdateFilter({
          type: 'countries.name',
          value: { 'countries.name': val } as FilterString
        }));
      }
    },
    [dispatch]
  );

  const handleAgeRatingSelect = useCallback(
    (val: string) => {
      if(val === 'reset'){
        dispatch(filmsSlice.actions.removeFilter('ageRating'));
      } else {
        dispatch(filmsSlice.actions.addOrUpdateFilter({
          type: 'ageRating',
          value: { ageRating: val } as FilterString
        }));
      }
    },
    [dispatch]
  );

  const handleResetFilters = useCallback(() => {
    dispatch(filmsSlice.actions.resetFilters([]));
  }, [dispatch]);

  return (
    <div className="filters-bar">
      <Select
        name="По году"
        options={years}
        onSelect={handleYearSelect}
        selectedValue={selectedYear}
      />
      <Select
        name="По стране"
        options={countries.map((country) => country.name)}
        onSelect={handleCountrySelect}
        selectedValue={selectedCountry}
      />
      <Select
        name="По возрастному рейтингу"
        options={ageRanking.map((opt) => opt.name)}
        onSelect={(selectedValue: string) =>
          handleAgeRatingSelect(
            ageRanking.find((el) => el.name === selectedValue)?.ranking || ''
          )
        }
        selectedValue={selectedAgeRating}
      />
      <Tooltip anchorSelect=".no-filter" place="top">
        Сбросить фильтры
      </Tooltip>
      <X onClick={handleResetFilters} className="no-filter" />
    </div>
  );
};

export default FiltersBar;
