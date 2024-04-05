import { Route, Routes } from 'react-router-dom';
import FilmPage from './pages/FilmPage/FilmPage';
import MainPage from './pages/MainPage/MainPage';
import Page404 from './pages/Page404/Page404';
import './styles/index.scss';

export const App = () => {
  return (
    <div className={`app normal`}>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="film/:id" element={<FilmPage />} />
        <Route path="*" element={<Page404 />} />
      </Routes>
    </div>
  );
};
