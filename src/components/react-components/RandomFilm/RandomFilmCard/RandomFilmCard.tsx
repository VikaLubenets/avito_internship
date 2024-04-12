import { IFilm } from '../../../../store/types';
import FilmInfo from '../../FilmCard/FilmInfo/FilmInfo';
import './RandomFilmCard.scss';

type Props = {
  film: IFilm;
};

const RandomFilmCard = ({ film }: Props) => {
  return (
    <div className="random-film-card">
      <FilmInfo
        name={film.name || film.names[0].name}
        description={film.description}
        rating={film.rating}
        poster={film.poster}
        isSeries={film.isSeries}
      />
    </div>
  );
};

export default RandomFilmCard;
