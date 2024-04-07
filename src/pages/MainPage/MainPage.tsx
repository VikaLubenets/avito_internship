import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useGetFilmDataQuery } from '../../api/api';
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
  const { data: searchResults, isLoading } = useGetFilmDataQuery({
    page: currentPage,
    limit: limitPerPage,
    selectFields: savedTerm ? `title:${savedTerm}` : '',
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
  }, [searchParams, currentPage, limitPerPage, savedTerm]);

  useEffect(() => {
    if (searchResults) {
      dispatch(filmsSlice.actions.setSearchResults(searchResults));
      dispatch(filmsSlice.actions.setTotalCount(searchResults.total));
    }
  }, [searchResults]);



  return (
    <div>
      <Search />
      {isLoading ? (
        <Loader />
      ) :
      (      
      <main>
        <div className="search-result__container">
          <FilmList />
        </div>
        <Pagination />
      </main>
      )}
    </div>
  );
};

export default MainPage;
