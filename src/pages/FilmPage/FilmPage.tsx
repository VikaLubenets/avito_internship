import React from 'react';
import { useParams } from 'react-router-dom';
import { useGetFilmDataByIdQuery } from '../../api/api';
import Header from '../../components/react-components/Header/Header';
import Loading from '../../components/react-components/Loader/Loader';

const FilmPage = () => {
  const { id } = useParams<{ id: string }>();

  const { data: filmData, isLoading } = useGetFilmDataByIdQuery(
    parseInt(id!, 10)
  );

  if (isLoading) {
    return <Loading />;
  }

  if (!filmData) {
    return (
      <>
       <Header />
       <div className="no-results">No such film</div>;
      </>
    )
  }

  const {
    name,
    description,
    rating,
    persons,
    poster,
  } = filmData;

  return (
    <React.Fragment>
       <Header />
       <main>
          <h1>{name}</h1>
          <p>Description: {description}</p>
          <p>IMDb Rating: {rating.imdb}</p>
          <h2>Actors:</h2>
          <ul>
            {persons.map((person) => (
              <li key={person.id}>{person.name}</li>
            ))}
          </ul>
          <h2>User Reviews:</h2>
          <h2>Posters:</h2>
          <div className="carousel">
            {poster && <img src={poster.url} alt={name} />}
          </div>
       </main>
    </React.Fragment>
  );
};

export default FilmPage;
