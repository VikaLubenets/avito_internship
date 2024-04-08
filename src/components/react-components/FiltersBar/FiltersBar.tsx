import React, { useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import Select from '../../ui/select';
import { useAppDispatch, useAppSelector } from '../../../store/hooks/redux';
import { filmsSlice } from '../../../store/reducers/filmsReducer';
import './FiltersBar.scss';
import { ageRanking } from './configs/AgeRanking';
import { countries } from './configs/Countries';
import { years } from './configs/Years';

const FiltersBar = () => {
  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useSearchParams();

  const selectedYear = searchParams.get('year') || '';
  const selectedCountry = searchParams.get('country') || '';
  const selectedAgeRating = searchParams.get('ageRating') || '';

	const handleYearSelect = useCallback(
		(value: string) => {
			setSearchParams((prev) => ({
				...Object.fromEntries(prev),
				year: value,
			}))
      dispatch(filmsSlice.actions.setYear(value));
      dispatch(filmsSlice.actions.setFilter('year'));
		},
		[searchParams],
	)

  const handleCountrySelect = useCallback(
		(value: string) => {
			setSearchParams((prev) => ({
				...Object.fromEntries(prev),
				'country.name': value,
			}))
      dispatch(filmsSlice.actions.setCountry(value));
      dispatch(filmsSlice.actions.setFilter('country'));
		},
		[searchParams],
	)

  const handleAgeRatingSelect = useCallback(
		(value: string) => {
			setSearchParams((prev) => ({
				...Object.fromEntries(prev),
				ageRating: value,
			}))
      dispatch(filmsSlice.actions.setAgeRating(value));
      dispatch(filmsSlice.actions.setFilter('ageRating'));
		},
		[searchParams],
	)

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
        options={countries.map(country => country.name)} 
        onSelect={handleCountrySelect} 
        selectedValue={selectedCountry}
      />
      <Select 
        name="По возрастному рейтингу" 
        options={ageRanking.map(opt => opt.name)} 
        onSelect={(selectedValue: string) => handleAgeRatingSelect(ageRanking.find(el => el.name === selectedValue)?.ranking || '')} 
        selectedValue={selectedAgeRating}
      />
    </div>
  );
};

export default FiltersBar;