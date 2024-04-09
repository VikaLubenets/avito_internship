import { Link } from 'react-router-dom';
import { IFilm } from '../../../../store/types';
import './Card.scss';

type Props = {
  film: IFilm;
};

const Card = ({ film }: Props) => {
  return (
    <Link to={`/film/${film.id}`} className="film-container">
      <div className="film-thumbnail">
        <img
          className="film-img"
          src={film.poster.url || 'public\no_image.svg'}
          alt={film.name}
        />
      </div>
      <div className="film-info">
        <h2 className="film-name">{film.names[0].name}</h2>
        <p className="film-year">{film.year}</p>
      </div>
    </Link>
  );
};

export default Card;
