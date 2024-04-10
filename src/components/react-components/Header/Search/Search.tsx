import { ChangeEvent, useCallback, useEffect, useState, useTransition } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAppDispatch } from '../../../../store/hooks/redux';
import { filmsSlice } from '../../../../store/reducers/filmsReducer';
import {
  DEFAULT_LIMIT_FILMS_PER_PAGE,
  DEFAULT_PAGE,
} from '../../../../utils/constants';
import { Button } from '../../../ui/button';
import './Search.scss';

const Search = () => {
  const dispatch = useAppDispatch();
  const [search, setSearch] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const [suggestions, setSuggestions] = useState<string[]>([]);

  useEffect(() => {
    const savedHistory = localStorage.getItem('userSearchHistory');
    if (savedHistory) {
      setSearchHistory(JSON.parse(savedHistory));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('userSearchHistory', JSON.stringify(searchHistory));
  }, [searchHistory]);

  const onChangeSearch = (searchValue: string) => {
    setSearch(searchValue);
    const suggestions = searchHistory.filter((item) =>
      item.toLowerCase().includes(searchValue.toLowerCase())
    );
    setSuggestions(suggestions);
  };

  const handleSuggestionClick = (value: string) => {
    setSearch(value);
    handleSearch(value);
  };

  const handleSearch = useCallback(
    (value: string) => {
      if (value) {
        setSearchParams((prev) => ({
          ...Object.fromEntries(prev),
          page: String(DEFAULT_PAGE),
          limit: String(DEFAULT_LIMIT_FILMS_PER_PAGE),
          query: value,
        }));
      } else {
        setSearchParams(() => ({
          page: String(DEFAULT_PAGE),
          limit: String(DEFAULT_LIMIT_FILMS_PER_PAGE),
        }));
      }
      dispatch(filmsSlice.actions.setSearch(value));
    },
    [dispatch, setSearchParams]
  );

  return (
    <div className='search__line'>
      <input
        className='input'
        type="search"
        placeholder="Поиск по названию"
        value={search}
        onChange={(event: ChangeEvent<HTMLInputElement>) => {
          onChangeSearch(event.target.value);
        }}
        onKeyDown={(event: React.KeyboardEvent<HTMLInputElement>) => {
          if (event.key === 'Enter') {
            handleSearch(search);
          }
        }}
      />
       {suggestions.length > 0 && (
        <ul className='suggestions'>
          {suggestions.map((suggestion) => (
            <li key={suggestion} onClick={() => handleSuggestionClick(suggestion)}>
              {suggestion}
            </li>
          ))}
        </ul>
      )}
      <Button
        type={'button'}
        title={'Найти'}
        className={'search__button'}
        onClick={() => handleSearch(search)}
      />
    </div>
  );
};

export default Search;
