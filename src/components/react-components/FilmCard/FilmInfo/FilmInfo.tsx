import { FilmPosterType, FilmRatingType, IFilm } from '../../../../store/types';
import './FilmInfo.scss';

type Props = {
  name: string;
  description: string;
  rating: FilmRatingType;
  poster: FilmPosterType;
  isSeries: boolean;
};

const FilmInfo = ({ name, description, rating, poster, isSeries }: Props) => {
  return (
    <div className="first-row-film-container">
      {poster && <img src={poster.url} alt={name} className="film-image" />}
      <div className="text-container">
        <h1>
          {isSeries ? 'Сериал ' : 'Фильм '}
          {`"${name}"`}
        </h1>
        <p>{description}</p>
        <p>Рейтинг Кинопоиска: {rating.kp}</p>
      </div>
    </div>
  );
};

export default FilmInfo;
