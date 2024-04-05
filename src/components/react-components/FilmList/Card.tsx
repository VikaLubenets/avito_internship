import { Link } from 'react-router-dom';
import './Card.scss';

export default function Card({ result, index }: any) {
  return (
    <Link
      to={`/film/${result.id}`}
      className="film-container"
      data-testid="film-container"
    >
      <h2 className="film-name">{`${index + 1}. ${result.title}`}</h2>
      <div className="film-description">
        <h3>Film description:</h3>
        <p>{result.description}</p>
      </div>
    </Link>
  );
}