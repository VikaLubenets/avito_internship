import { Link } from 'react-router-dom';
import { IFilm } from '../../../../store/types';
import './Card.scss';

type Props = {
  film: IFilm;
};

const Card = ({ film }: Props) => {
  const filmName =
    film.name ||
    film.alternativeName ||
    (film.names && film.names[0]?.name) ||
    'Название отсутствует';

  return (
    <Link to={`/film/${film.id}`} className="film-container">
      <div className="film-thumbnail">
        <img
          className="film-img"
          src={film.logo?.url ?? film.poster?.url ?? 'no_image.svg'}
          alt={filmName}
        />
        <p className="film-card__name">{filmName}</p>
      </div>
    </Link>
  );
};

export default Card;
