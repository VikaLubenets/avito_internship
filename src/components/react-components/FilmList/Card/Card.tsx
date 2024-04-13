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
          src={film.poster.url || './no_image.svg'}
          alt={film.name || film.names[0].name || 'Название отсутствует'}
        />
        <p className='film-card__name'>{film.name || film.names[0].name || 'Название отсутствует'}</p>
      </div>
    </Link>
  );
};

export default Card;
