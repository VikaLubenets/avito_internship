import { useCallback, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Select from '../../../ui/select';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks/redux';
import {
  filmsSlice,
  selectNormalizedFilterOptions,
} from '../../../../store/reducers/filmsReducer';
import './FiltersBar.scss';
import { ageRating } from '../../../../utils/filterConfigs/AgeRanking';
import { countries } from '../../../../utils/filterConfigs/Countries';
import { years } from '../../../../utils/filterConfigs/Years';
import { FilterString } from '../../../../store/types';
import { X } from 'lucide-react';
import { Tooltip } from 'react-tooltip';

const FiltersBar = () => {
  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useSearchParams();

  const selectedYear = searchParams.get('year') || '';
  const selectedCountry = searchParams.get('country') || '';
  const selectedAgeRating = searchParams.get('ageRating') || '';

  const filterOptions = useAppSelector(selectNormalizedFilterOptions);

  useEffect(() => {
    setSearchParams(() => ({
      ...filterOptions,
    }));
  }, [filterOptions, setSearchParams]);

  const handleYearSelect = useCallback(
    (val: string) => {
      if (val === 'reset') {
        dispatch(filmsSlice.actions.removeFilter('year'));
      } else {
        dispatch(
          filmsSlice.actions.addOrUpdateFilter({
            type: 'year',
            value: { year: val } as FilterString,
          })
        );
      }
    },
    [dispatch]
  );

  const handleCountrySelect = useCallback(
    (val: string) => {
      if (val === 'reset') {
        dispatch(filmsSlice.actions.removeFilter('countries.name'));
      } else {
        dispatch(
          filmsSlice.actions.addOrUpdateFilter({
            type: 'countries.name',
            value: { 'countries.name': val } as FilterString,
          })
        );
      }
    },
    [dispatch]
  );

  const handleAgeRatingSelect = useCallback(
    (val: string) => {
      if (val === 'reset') {
        dispatch(filmsSlice.actions.removeFilter('ageRating'));
      } else {
        dispatch(
          filmsSlice.actions.addOrUpdateFilter({
            type: 'ageRating',
            value: { 'ageRating': val } as FilterString,
          })
        );
      }
    },
    [dispatch]
  );

  const handleResetFilters = useCallback(() => {
    dispatch(filmsSlice.actions.resetFilters([]));
  }, [dispatch]);

  return (
    <div className="filters-bar-container-row">
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
          options={ageRating.map((opt) => opt.name)}
          onSelect={(selectedValue: string) =>
            handleAgeRatingSelect(
              ageRating.find((el) => el.name === selectedValue)?.ranking || ''
            )
          }
          selectedValue={selectedAgeRating}
        />
      </div>
      <Tooltip anchorSelect=".no-filter" place="top">
        Сбросить фильтры
      </Tooltip>
      <X onClick={handleResetFilters} className="no-filter" />
    </div>
  );
};

export default FiltersBar;
