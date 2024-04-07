import { Link } from 'react-router-dom';
import { IFilm } from '../../../store/types';
import './Card.scss';

type Props = {
  result: IFilm;
  index: number;
};

const Card = ({ result, index }: Props) => {
  return (
    <Link
      to={`/film/${result.id}`}
      className="film-container"
      data-testid="film-container"
    >
      <h2 className="film-name">{`${index + 1}. ${result.name}`}</h2>
      <div className="film-description">
        <h3>Film description:</h3>
        <p>{result.description}</p>
      </div>
    </Link>
  );
};

export default Card;
