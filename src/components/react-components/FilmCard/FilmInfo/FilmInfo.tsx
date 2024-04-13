import { FilmPosterType, FilmRatingType } from '../../../../store/types';
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
      {poster && (
        <img
          src={poster.url || './no-image.svg'}
          alt={name || 'no image'}
          className="film-image"
        />
      )}
      <div className="text-container">
        <h1 className="film-info-name">
          {isSeries ? 'Сериал ' : 'Фильм '}
          {`"${name || 'Нет наименования'}"`}
        </h1>
        <p>{description || 'Нет описания'}</p>
        <p>Рейтинг Кинопоиска: {rating.kp || 'Нет рейтинга'}</p>
      </div>
    </div>
  );
};

export default FilmInfo;
