import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useGetFilmDataByIdQuery } from '../../api/api';
import FilmCard from '../../components/react-components/FilmCard/FilmCard';
import Header from '../../components/react-components/Header/Header';
import Loading from '../../components/react-components/Loader/Loader';
import { Button } from '../../components/ui/button';

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
    );
  }

  return (
    <React.Fragment>
      <main className='main-container'>
        <Link to={'/'}>
          <Button type={'button'} title={'На главную'} className={''} />
        </Link>
        <FilmCard data={filmData} />
      </main>
    </React.Fragment>
  );
};

export default FilmPage;
