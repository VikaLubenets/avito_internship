import { useEffect, useTransition } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import {
  useGetAllFilmsAndSeriesQuery,
  useGetSearchFilmsQuery,
} from '../../api/api';
import FilmList from '../../components/react-components/FilmList/FilmList';
import FiltersContainer from '../../components/react-components/FiltersContainer/FiltersContainer';
import Header from '../../components/react-components/Header/Header';
import Loading from '../../components/react-components/Loader/Loader';
import CustomPagination from '../../components/react-components/CustomPagination/CustomPagination';
import { useAppDispatch, useAppSelector } from '../../store/hooks/redux';
import { filmsSlice } from '../../store/reducers/filmsReducer';

const MainPage = () => {
  const dispatch = useAppDispatch();
  const currentPage = useAppSelector((state) => state.films.currentPage);
  const limitPerPage = useAppSelector((state) => state.films.limitPerPage);
  const search = useAppSelector((state) => state.films.search);
  const isLoading = useAppSelector((state) => state.films.isLoading);
  const [searchParams, setSearchParams] = useSearchParams();
  const { data: films, isLoading: isLoadingAll } = useGetAllFilmsAndSeriesQuery(
    {params: Object.fromEntries(searchParams.entries()),},
    {skip: search !== ''}
  );

  const { data: searchResults, isLoading: isLoadingSearch } =
    useGetSearchFilmsQuery(
      {
        query: search,
      },
      { skip: search === '' }
    );

  useEffect(() => {
    setSearchParams((prev) => ({
      ...Object.fromEntries(prev),
      page: String(currentPage),
      limit: String(limitPerPage),
    }));
  }, [currentPage, limitPerPage, setSearchParams]);

  useEffect(() => {
    if (isLoadingAll) {
      dispatch(filmsSlice.actions.setIsLoading(isLoadingAll));
    } else if (isLoadingSearch) {
      dispatch(filmsSlice.actions.setIsLoading(isLoadingSearch));
    } else {
      dispatch(filmsSlice.actions.setIsLoading(false));
    }
  }, [isLoadingAll, isLoadingSearch, dispatch]);

  useEffect(() => {
    if (search && searchResults) {
      dispatch(filmsSlice.actions.setFilms(searchResults.docs));
      dispatch(filmsSlice.actions.setTotalCount(searchResults.total));
      dispatch(filmsSlice.actions.setTotalPages(searchResults.pages));
    } else if (films) {
      dispatch(filmsSlice.actions.setFilms(films.docs));
      dispatch(filmsSlice.actions.setTotalCount(films.total));
      dispatch(filmsSlice.actions.setTotalPages(films.pages));
    }
  }, [films, searchResults, dispatch, search]);

  return (
    <main className="main-container">
      <Header />
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <FiltersContainer />
          {search !== '' ? (
            <>
              {searchResults &&
                searchResults.docs &&
                searchResults.docs.length > 0 ? (
                <>
                  <FilmList
                    films={searchResults.docs}
                    total={searchResults.total}
                  />
                  <CustomPagination totalPages={searchResults.pages} />
                </>
              ) : (
                <div className="no-results">No results</div>
              )}
            </>
          ) : (
            <>
              {films && films.docs && films.docs.length > 0 ? (
                <>
                  <FilmList films={films.docs} total={films.total} />
                  <CustomPagination totalPages={films.pages} />
                </>
              ) : (
                <div className="no-results">No results</div>
              )}
            </>
          )}
        </>
      )}
    </main>
  );
};

export default MainPage;
