import { useCallback, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Select from '../../ui/select';
import { useAppDispatch, useAppSelector } from '../../../store/hooks/redux';
import { filmsSlice } from '../../../store/reducers/filmsReducer';
import './FiltersBar.scss';
import { ageRanking } from './configs/AgeRanking';
import { countries } from './configs/Countries';
import { years } from './configs/Years';
import { FilterString } from '../../../store/types';
import { DEFAULT_LIMIT_FILMS_PER_PAGE, DEFAULT_PAGE } from '../../../utils/constants';
import { X } from 'lucide-react';
import { Tooltip } from 'react-tooltip'

const FiltersBar = () => {
  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useSearchParams();

  const selectedYear = searchParams.get('year') || '';
  const selectedCountry = searchParams.get('country') || '';
  const selectedAgeRating = searchParams.get('ageRating') || '';

  const filterOption = useAppSelector((state) => state.films.filter);

  useEffect(() => {
    setSearchParams(() => ({
      page: String(DEFAULT_PAGE),
      limit: String(DEFAULT_LIMIT_FILMS_PER_PAGE),
      ...filterOption,
    }));

  }, [filterOption])

  const handleYearSelect = useCallback(
    (value: string) => {
      dispatch(filmsSlice.actions.setYear(value));
      dispatch(filmsSlice.actions.setFilter({'year': value} as FilterString));
    },
    [dispatch, setSearchParams]
  );

  const handleCountrySelect = useCallback(
    (value: string) => {
      dispatch(filmsSlice.actions.setCountry(value));
      dispatch(filmsSlice.actions.setFilter({'countries.name': value} as FilterString));
    },
    [dispatch, setSearchParams]
  );

  const handleAgeRatingSelect = useCallback(
    (value: string) => {
      dispatch(filmsSlice.actions.setAgeRating(value));
      dispatch(filmsSlice.actions.setFilter({'ageRating': value} as FilterString));
    },
    [dispatch, setSearchParams]
  );

  const handleResetFilters = useCallback(
    () => {
      dispatch(filmsSlice.actions.setFilter(null));
    },
    [dispatch, setSearchParams]
  );

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
      <X 
          onClick={handleResetFilters}
          className="no-filter"
        />
    </div>
  );
};

export default FiltersBar;
