import { ChangeEvent, useCallback, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAppDispatch } from '../../../store/hooks/redux';
import { filmsSlice } from '../../../store/reducers/filmsReducer';
import {
  DEFAULT_LIMIT_FILMS_PER_PAGE,
  DEFAULT_PAGE,
} from '../../../utils/constants';
import { Button } from '../../ui/button';
import './Search.scss';

const Search = () => {
  const dispatch = useAppDispatch();
  const [search, setSearch] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();

  const onChangeSearch = (searchValue: string) => {
    setSearch(searchValue);
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
    <div className="search-line">
      <input
        type="search"
        placeholder="Поиск"
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
      <Button
        type={'button'}
        title={'Искать'}
        className={'search-button'}
        onClick={() => handleSearch(search)}
      />
    </div>
  );
};

export default Search;
