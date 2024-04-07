import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useGetAllFilmsAndSeriesQuery } from '../../api/api';
import FilmList from '../../components/react-components/FilmList/FilmList';
import Loader from '../../components/react-components/Loader/Loader';
import Pagination from '../../components/react-components/Pagination/Pagination';
import Search from '../../components/react-components/Search/Search';
import { useAppDispatch, useAppSelector } from '../../store/hooks/redux';
import { filmsSlice } from '../../store/reducers/filmsReducer';

const MainPage = () => {
  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const savedTerm = useAppSelector((state) => state.films.savedTerm);
  const currentPage = useAppSelector((state) => state.films.currentPage);
  const limitPerPage = useAppSelector((state) => state.films.limitPerPage);
  const { data: films, isLoading } = useGetAllFilmsAndSeriesQuery({
    page: currentPage,
    limit: limitPerPage,
  });

  useEffect(() => {
    if (savedTerm) {
      setSearchParams({
        search: savedTerm,
        page: String(currentPage),
        limit: String(limitPerPage),
      });
    } else {
      setSearchParams({
        page: String(currentPage),
        limit: String(limitPerPage),
      });
    }
  }, [searchParams, currentPage, limitPerPage, savedTerm, setSearchParams]);

  useEffect(() => {
    if (films) {
      dispatch(filmsSlice.actions.setFilms(films.docs));
      dispatch(filmsSlice.actions.setTotalCount(films.total));
      dispatch(filmsSlice.actions.setTotalPages(films.pages));
    }
  }, [films]);

  return (
    <main className='main-container'>
      <Search />
      {isLoading ? (
        <Loader />
      ) : (
        <>
          {films && films.docs && films.docs.length > 0 ? (
            <>
              <div className="search-result__container">
                <FilmList films={films.docs} total={films.total || 0} />
              </div>
              <Pagination />
            </>
          ) : (
            <div className='no-results'>
              No results
            </div>
          )}
        </>
      )}
    </main>
  );
};

export default MainPage;