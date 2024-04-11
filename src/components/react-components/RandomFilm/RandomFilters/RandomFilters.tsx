import { X } from 'lucide-react';
import { Tooltip } from 'react-tooltip';
import { ageRanking } from '../../../../utils/filterConfigs/AgeRanking';
import { countries } from '../../../../utils/filterConfigs/Countries';
import { genres } from '../../../../utils/filterConfigs/Genres';
import { productionNames } from '../../../../utils/filterConfigs/Production';
import { years } from '../../../../utils/filterConfigs/Years';
import MultiSelectDropdown from '../../../ui/MultiSelectDropdown/MultiSelectDropdown';
import Select from '../../../ui/select';
import './RandomFilters.scss';

const RandomFilters = () => {
  return (
    <div className='random-film-filters__container'>
      <MultiSelectDropdown 
        title='По году'
        options={years} 
        onSelect={() => {}}
      />
      <MultiSelectDropdown 
        title='По стране'
        options={countries.map((country) => country.name)} 
        onSelect={() => {}}
      />
      <MultiSelectDropdown 
        title='По возрастному рейтингу'
        options={ageRanking.map((opt) => opt.name)} 
        onSelect={() => {}}
      />
      <MultiSelectDropdown 
        title='По компании производства'
        options={productionNames} 
        onSelect={() => {}}
      />
      <MultiSelectDropdown 
        title='По жанру'
        options={genres.map((opt) => opt.name)} 
        onSelect={() => {}}
      />
      <Select
        name="По типу"
        options={['Фильм', 'Сериал']}
        onSelect={() => {}}
      />
      <label htmlFor='rating-kp'>
        По рейтингу Кинопоиска
        <input 
          name='rating-kp'
          type={'range'}
          min={0}
          max={10}
          className='rating-kp-input'
        />
      </label>
      <Tooltip anchorSelect=".no-filter" place="top">
        Сбросить фильтры
      </Tooltip>
      <X onClick={() => {}} className="no-filter" />
    </div>
  )
};

export default RandomFilters;