import { useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../store/hooks/redux';
import { filmsSlice } from '../../../store/reducers/filmsReducer';
import Select from '../../ui/select';
import FiltersBar from '../FiltersBar/FiltersBar';
import Search from '../Search/Search';
import './Header.scss';

const Header = () => {
  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedQuantity = useAppSelector((state) => state.films.limitPerPage);

  const onSelect = useCallback(
    (value: string) => {
      setSearchParams((prev) => ({
        ...Object.fromEntries(prev),
        limit: value,
      }));
      dispatch(filmsSlice.actions.setLimitPerPage(Number(value)));
    },
    [dispatch, setSearchParams]
  );

  return (
    <header className="header">
      <Search />
      <div className="filters-container">
        <FiltersBar />
        <Select
          name={'Фильмов на странице'}
          options={['10', '20', '30', '40']}
          onSelect={onSelect}
          selectedValue={String(selectedQuantity)}
        />
      </div>
    </header>
  );
};

export default Header;
