import Search from './Search/Search';
import './Header.scss';

const Header = () => {
  return (
    <header className="header">
      <h1 className="logo-text">ФИЛЬМОТЕКА</h1>
      <Search />
    </header>
  );
};

export default Header;
