import { useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../store/hooks/redux';
import { filmsSlice } from '../../../store/reducers/filmsReducer';
import { DEFAULT_LIMIT_FILMS_PER_PAGE } from '../../../utils/constants';
import Select from '../../ui/select';
import FiltersBar from './FiltersBar/FiltersBar';
import './FiltersContainer.scss';

const FiltersContainer = () => {
  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedQuantity = useAppSelector((state) => state.films.limitPerPage);

  const onSelect = useCallback(
    (value: string) => {
      if (value === 'reset') {
        setSearchParams((prev) => ({
          ...Object.fromEntries(prev),
          limit: String(DEFAULT_LIMIT_FILMS_PER_PAGE),
        }));
        dispatch(
          filmsSlice.actions.setLimitPerPage(DEFAULT_LIMIT_FILMS_PER_PAGE)
        );
      } else {
        setSearchParams((prev) => ({
          ...Object.fromEntries(prev),
          limit: value,
        }));
        dispatch(filmsSlice.actions.setLimitPerPage(Number(value)));
      }
    },
    [dispatch, setSearchParams]
  );

  return (
    <div className="filters-container">
      <FiltersBar />
      <Select
        className="limitPerPage-select"
        name={'Фильмов на странице'}
        options={['10', '20', '30', '40']}
        onSelect={onSelect}
        selectedValue={String(selectedQuantity)}
      />
    </div>
  );
};

export default FiltersContainer;
