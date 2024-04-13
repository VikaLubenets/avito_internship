import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useDebounce } from '../../../../hooks/useDebounce';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks/redux';
import { filmsSlice } from '../../../../store/reducers/filmsReducer';
import {
  DEFAULT_LIMIT_FILMS_PER_PAGE,
  DEFAULT_PAGE,
} from '../../../../utils/constants';
import { Button } from '../../../ui/button';
import './Search.scss';

const Search = () => {
  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState(searchParams.get('query') || '');
  const debouncedValue = useDebounce(search, 1000);
  const searchHistory = useAppSelector((state) => state.films.searchHistory);
  const suggestions = useAppSelector((state) => state.films.searchSuggestions);

  useEffect(() => {
    if (search) {
      setSearchParams((prev) => ({
        ...Object.fromEntries(prev),
        page: String(DEFAULT_PAGE),
        limit: String(DEFAULT_LIMIT_FILMS_PER_PAGE),
        query: search,
      }));
    } else {
      setSearchParams(() => ({
        page: String(DEFAULT_PAGE),
        limit: String(DEFAULT_LIMIT_FILMS_PER_PAGE),
      }));
    }
  }, [search, setSearchParams]);

  const onChangeSearch = useCallback((searchValue: string) => {
    setSearch(searchValue);
  }, []);

  const handleSearch = useCallback(
    (value: string) => {
      dispatch(filmsSlice.actions.setSearch(value));

      if (value && !searchHistory.includes(value)) {
        dispatch(filmsSlice.actions.setSearchHistory(value));
      }

      const suggestions = searchHistory.filter((item) =>
        item.toLowerCase().includes(value.toLowerCase())
      );
      dispatch(filmsSlice.actions.setSearchSuggestions(suggestions));
    },
    [dispatch, searchHistory]
  );

  const handleSuggestionClick = useCallback(
    (value: string) => {
      setSearch(value);
      handleSearch(value);
      dispatch(filmsSlice.actions.setSearchSuggestions([]));
    },
    [dispatch, handleSearch]
  );

  const handleInputChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      onChangeSearch(event.target.value);
      if (event.target.value === '') {
        handleSearch('');
      }
    },
    [onChangeSearch, handleSearch]
  );

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === 'Enter') {
        handleSearch(search);
      }
    },
    [handleSearch, search]
  );

  useEffect(() => {
    if (debouncedValue) {
      handleSearch(debouncedValue);
    }
  }, [debouncedValue, handleSearch]);

  return (
    <div className="search__line">
      <div className="input-container">
        <input
          className="input"
          type="search"
          placeholder="Поиск по названию"
          value={search}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
        />
        {suggestions.length > 0 && search && (
          <ul className="suggestions">
            {suggestions.map(
              (suggestion) =>
                suggestion.toLowerCase() !== search.toLowerCase() && (
                  <li
                    className="suggestions-row"
                    key={suggestion}
                    onClick={() => handleSuggestionClick(suggestion)}
                  >
                    {suggestion}
                  </li>
                )
            )}
          </ul>
        )}
      </div>
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
