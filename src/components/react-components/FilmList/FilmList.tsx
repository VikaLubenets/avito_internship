import { IFilm } from '../../../store/types';
import Card from './Card/Card';
import './FilmList.scss';

type Props = {
  films: IFilm[];
  total: number;
};

const FilmList = ({ films, total }: Props) => {
  return (
    <>
      <h2 className="film-list-title">
        Всего у нас для вас есть {total} фильмов и сериалов
      </h2>
      <div className="film-list">
        {films.map((film) => (
          <Card film={film} key={film.id} />
        ))}
      </div>
    </>
  );
};

export default FilmList;
