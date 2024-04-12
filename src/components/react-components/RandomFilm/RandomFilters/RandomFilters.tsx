import { X } from 'lucide-react';
import { Tooltip } from 'react-tooltip';
import { useCallback } from 'react';
import { useAppDispatch } from '../../../../store/hooks/redux';
import { ageRanking } from '../../../../utils/filterConfigs/AgeRanking';
import { countries } from '../../../../utils/filterConfigs/Countries';
import { genres } from '../../../../utils/filterConfigs/Genres';
import { productionNames } from '../../../../utils/filterConfigs/Production';
import { years } from '../../../../utils/filterConfigs/Years';
import MultiSelectDropdown from '../../../ui/MultiSelectDropdown/MultiSelectDropdown';
import Select from '../../../ui/select';
import './RandomFilters.scss';
import RatingRange from './RatingRange/RatingRange';
import { filmsSlice } from '../../../../store/reducers/filmsReducer';

const RandomFilters = () => {
  const dispatch = useAppDispatch();

  const handleYearSelect = useCallback(
    (selectedYears: string[]) => {
      const newFilter = { year: selectedYears };
      dispatch(filmsSlice.actions.addOrUpdateRandomFilter(newFilter));
    },
    [dispatch]
  );

  const handleCountrySelect = useCallback(
    (selectedCountries: string[]) => {
      const newFilter = { 'countries.name': selectedCountries };
      dispatch(filmsSlice.actions.addOrUpdateRandomFilter(newFilter));
    },
    [dispatch]
  );

  const handleAgeRatingSelect = useCallback(
    (selectedAgeRatings: string[]) => {
      const newFilter = { ageRating: selectedAgeRatings };
      dispatch(filmsSlice.actions.addOrUpdateRandomFilter(newFilter));
    },
    [dispatch]
  );

  const handleProductionNameSelect = useCallback(
    (selectedProductionNames: string[]) => {
      const newFilter = { 'networks.items.name': selectedProductionNames };
      dispatch(filmsSlice.actions.addOrUpdateRandomFilter(newFilter));
    },
    [dispatch]
  );

  const handleGenreSelect = useCallback(
    (selectedGenres: string[]) => {
      const newFilter = { 'genres.name': selectedGenres };
      dispatch(filmsSlice.actions.addOrUpdateRandomFilter(newFilter));
    },
    [dispatch]
  );

  // const handleTypeSelect = useCallback((selectedType: string) => {
  //     const newFilter = { 'isSeries': selectedType === 'Сериал' };
  //     dispatch(filmsSlice.actions.addOrUpdateRandomFilter(newFilter));
  // }, [dispatch]);

  const handleResetFilters = useCallback(() => {
    dispatch(filmsSlice.actions.resetRandomFilters());
  }, [dispatch]);

  return (
    <div className="random-film-filters__container">
      <Tooltip anchorSelect=".no-filter" place="top">
        Сбросить фильтры
      </Tooltip>
      <X onClick={handleResetFilters} className="no-filter" />
      <div className="random-film-filters">
        <MultiSelectDropdown
          title="По году"
          options={years}
          onSelect={handleYearSelect}
        />
        <MultiSelectDropdown
          title="По стране"
          options={countries.map((country) => country.name)}
          onSelect={handleCountrySelect}
        />
        <MultiSelectDropdown
          title="По возрастному рейтингу"
          options={ageRanking.map((opt) => opt.name)}
          onSelect={handleAgeRatingSelect}
        />
        <MultiSelectDropdown
          title="По компании производства"
          options={productionNames}
          onSelect={handleProductionNameSelect}
        />
        <MultiSelectDropdown
          title="По жанру"
          options={genres.map((opt) => opt.name)}
          onSelect={handleGenreSelect}
        />
        <Select
          className="random-filter-select"
          name="По типу"
          options={['Фильм', 'Сериал']}
          onSelect={() => {}}
        />
      </div>
      <RatingRange />
    </div>
  );
};

export default RandomFilters;
