import { useState } from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import FilmPage from './pages/FilmPage/FilmPage';
import MainPage from './pages/MainPage/MainPage';
import './styles/index.scss';

export enum Theme {
  NORMAL = 'normal',
  DARK = 'dark',
}

export const App = () => {
  const [theme, setTheme] = useState<Theme>(Theme.NORMAL);

  const toggleTheme = () => {
    setTheme( theme === Theme.NORMAL ? Theme.DARK : Theme.NORMAL);
  }
  return (
    <div className={`app ${theme}`}>
      <button onClick={toggleTheme}>Toggle theme</button>
      <Routes>
        <Route path="/" element={<MainPage />}/>
        <Route path='/film' element={<FilmPage />}/>
      </Routes>
    </div>
  );
};
