import {
  ChangeEvent,
  useCallback,
  useEffect,
  useState,
  useTransition,
} from 'react';
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
  const [search, setSearch] = useState('');
  const debouncedValue = useDebounce(search, 1000);
  const [searchParams, setSearchParams] = useSearchParams();
  const searchHistory = useAppSelector((state) => state.films.searchHistory);
  const suggestions = useAppSelector((state) => state.films.searchSuggestions);

  const onChangeSearch = (searchValue: string) => {
    setSearch(searchValue);
  };

  const handleSuggestionClick = (value: string) => {
    setSearch(value);
    handleSearch(value);
    dispatch(filmsSlice.actions.setSearchSuggestions([]));
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

      if (value && !searchHistory.includes(value)) {
        dispatch(filmsSlice.actions.setSearchHistory(value));
      }

      const suggestions = searchHistory.filter((item) =>
        item.toLowerCase().includes(value.toLowerCase())
      );
      dispatch(filmsSlice.actions.setSearchSuggestions(suggestions));
    },
    [dispatch, setSearchParams, searchHistory]
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
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            onChangeSearch(event.target.value);
          }}
          onKeyDown={(event: React.KeyboardEvent<HTMLInputElement>) => {
            if (event.key === 'Enter') {
              handleSearch(search);
            }
          }}
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
