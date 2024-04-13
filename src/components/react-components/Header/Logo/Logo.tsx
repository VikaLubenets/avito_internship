import { Link } from 'react-router-dom';
import './Logo.scss';

const Logo = () => {
  return (
    <div>
      <Link className="logo-text" to={'/'}>
        <h1 className="logo-text">ФИЛЬМОТЕКА</h1>
      </Link>
    </div>
  );
};

export default Logo;
