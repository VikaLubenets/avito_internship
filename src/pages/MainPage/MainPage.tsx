import { useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { useGetAllFilmsAndSeriesQuery, useGetSearchFilmsQuery } from '../../api/api';
import FilmList from '../../components/react-components/FilmList/FilmList';
import Header from '../../components/react-components/Header/Header';
import Loading from '../../components/react-components/Loader/Loader';
import CustomPagination from '../../components/react-components/Pagination/Pagination';
import { useAppDispatch, useAppSelector } from '../../store/hooks/redux';
import { filmsSlice } from '../../store/reducers/filmsReducer';
import { DEFAULT_LIMIT_FILMS_PER_PAGE, DEFAULT_PAGE } from '../../utils/constants';

const MainPage = () => {
  const dispatch = useAppDispatch();
  const currentPage = useAppSelector((state) => state.films.currentPage);
  const limitPerPage = useAppSelector((state) => state.films.limitPerPage);
  const search = useAppSelector((state) => state.films.search);
  const [searchParams, setSearchParams] = useSearchParams();
  const {data: films, isLoading} = search 
    ? useGetSearchFilmsQuery({
      page: DEFAULT_PAGE,
      limit: DEFAULT_LIMIT_FILMS_PER_PAGE,
      query: search,
    }) 
    : useGetAllFilmsAndSeriesQuery({
      page: currentPage,
      limit: limitPerPage,
        ...searchParams.entries(),
      })

    useEffect(() => {
      setSearchParams((prev) => ({
        ...Object.fromEntries(prev),
        page: String(DEFAULT_PAGE),
        limit: String(DEFAULT_LIMIT_FILMS_PER_PAGE)
      }))
    }, [])
    
    useEffect(() => {
        if (films) {
          dispatch(filmsSlice.actions.setFilms(films.docs));
          dispatch(filmsSlice.actions.setTotalCount(films.total));
          dispatch(filmsSlice.actions.setTotalPages(films.pages));
        }
      }, [films, dispatch]);

  return (
    <main className="main-container">
      <Header />
      {isLoading ? (
        <Loading />
      ) : (
        <>
          {films && films.docs && films.docs.length > 0 ? (
            <>
              <FilmList films={films.docs} total={films.total || 0} />
              <CustomPagination />
            </>
          ) : (
            <div className="no-results">No results</div>
          )}
        </>
      )}
    </main>
  );
};

export default MainPage;
