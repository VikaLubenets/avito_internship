import { useGetFilmDataByGenreQuery } from '../../../../api/api';
import { Genre, IFilm } from '../../../../store/types';
import Card from '../Card/Card';
import './GenreLine.scss';

type Props = {
  genre: Genre;
}

const GenreLine = ({ genre }: Props) => {
  const { data: films, isLoading } = useGetFilmDataByGenreQuery({
    genre: genre.name,
    limit: 10,
  });

  return (
    <div className="genre-line">
      <h2 className="genre-name">{genre.title}</h2>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div className="film-row">
          {films?.docs?.map((film: IFilm, index: number) => (
            <Card key={index} film={film} />
          ))}
        </div>
      )}
    </div>
  );
};

export default GenreLine;

