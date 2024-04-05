import FilmList from '../../components/react-components/FilmList/FilmList';
import Pagination from '../../components/react-components/Pagination/Pagination';
import Search from '../../components/react-components/Search/Search';

const MainPage = () => {
  return (
    <div>
      <Search />
      <main>
          <div className="search-result__container">
            <FilmList />
          </div>
          <Pagination />
        </main>
    </div>
  );
};

export default MainPage;
