import { Link } from 'react-router-dom';
import { IFilm } from '../../../../store/types';
import './Card.scss';

type Props = {
  film: IFilm;
};

const Card = ({ film }: Props) => {
  const filmName =
    film.name ?? film.alternativeName ?? film.enName ?? 'Название отсутствует';

  return (
    <Link to={`/film/${film.id}`} className="film-container">
      <div className="film-thumbnail">
        <img
          className="film-img"
          src={
            film.logo?.url ??
            film.poster?.url ??
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGJY82_orZH-Uhffb4PttFzSq1em-X9ZAE2g&s'
          }
          alt={filmName}
        />
        <p className="film-card__name">{filmName}</p>
      </div>
    </Link>
  );
};

export default Card;
