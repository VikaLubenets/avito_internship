import React from 'react';
import { useParams } from 'react-router-dom';
import { useGetFilmDataByIdQuery } from '../../api/api';
import FilmCard from '../../components/react-components/FilmCard/FilmCard';
import Header from '../../components/react-components/Header/Header';
import Loading from '../../components/react-components/Loader/Loader';
import NoResults from '../../components/react-components/NoResults/NoResults';
import ReturnButton from '../../components/react-components/ReturnButton/ReturnButton';

const FilmPage = () => {
  const { id } = useParams<{ id: string }>();

  const { data: filmData, isLoading } = useGetFilmDataByIdQuery(
    parseInt(id!, 10)
  );

  return (
    <React.Fragment>
      <Header key={'header'} />
      {isLoading ? (
        <Loading />
      ) : filmData ? (
        <main className="main-container">
          <ReturnButton data-testid="return-button" />
          <FilmCard data={filmData} data-testid="film-card" />
        </main>
      ) : (
        <NoResults />
      )}
    </React.Fragment>
  );
};

export default FilmPage;
