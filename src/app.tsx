import { Route, Routes } from 'react-router-dom';
import { useEffect } from 'react';
import FilmPage from './pages/FilmPage/FilmPage';
import MainPage from './pages/MainPage/MainPage';
import Page404 from './pages/Page404/Page404';
import { useAppDispatch } from './store/hooks/redux';
import './styles/index.scss';
import { userSlice } from './store/reducers/userReducer';

export const App = () => {

  const dispach = useAppDispatch();

  useEffect(() => {
    dispach(userSlice.actions.initAuthData())

  }, [dispach])

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
