import { Route, Routes } from 'react-router-dom';
import { useEffect } from 'react';
import FilmPage from './pages/FilmPage/FilmPage';
import MainPage from './pages/MainPage/MainPage';
import Page404 from './pages/Page404/Page404';
import { useAppDispatch, useAppSelector } from './store/hooks/redux';
import { userSlice } from './store/reducers/userReducer';
import RandomFilmPage from './pages/RandomFilmPage/RandomFilmPage';
import './styles/index.scss';
import { PrivateRoutes } from './components/react-components/PrivateRoutes/PrivateRoutes';

export const App = () => {
  const dispach = useAppDispatch();

  useEffect(() => {
    dispach(userSlice.actions.initAuthData());
  }, [dispach]);

  const isAuth = useAppSelector((state) => state.user.authData);

  return (
    <div className={`app normal`}>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route element={<PrivateRoutes isAuthenticated={!!isAuth} />}>
          <Route path='randomFilm' element={<RandomFilmPage />} />
        </Route>
        <Route path="film/:id" element={<FilmPage />} />
        <Route path="*" element={<Page404 />} />
      </Routes>
    </div>
  );
};
