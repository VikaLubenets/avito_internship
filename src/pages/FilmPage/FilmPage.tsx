import React from 'react';
import { useParams } from 'react-router-dom';
import { useGetFilmDataByIdQuery } from '../../api/api';
import Loader from '../../components/react-components/Loader/Loader';

const FilmPage = () => {
  const { id } = useParams<{ id: string }>();

  const { data: filmData, isLoading } = useGetFilmDataByIdQuery(
    parseInt(id!, 10)
  );

  if (isLoading) {
    return <Loader />;
  }

  if (!filmData) {
    return <div className="no-results">No such film</div>;
  }

  const {
    name,
    description,
    rating,
    persons,
    seasonsInfo,
    reviewInfo,
    poster,
  } = filmData;

  return (
    <React.Fragment>
      <h1>{name}</h1>
      <p>Description: {description}</p>
      <p>IMDb Rating: {rating.imdb}</p>
      <h2>Actors:</h2>
      <ul>
        {persons.map((person) => (
          <li key={person.id}>{person.name}</li>
        ))}
      </ul>
      <h2>Seasons and Episodes:</h2>
      <ul>
        {seasonsInfo.map((season) => (
          <li key={season.number}>
            Season {season.number}: {season.episodesCount} episodes
          </li>
        ))}
      </ul>
      <h2>User Reviews:</h2>
      <p>Count: {reviewInfo.count}</p>
      <h2>Posters:</h2>
      <div className="carousel">
        {poster && <img src={poster.url} alt={name} />}
      </div>
    </React.Fragment>
  );
};

export default FilmPage;
