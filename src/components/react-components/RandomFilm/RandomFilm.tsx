import RandomButton from './RandomButton/RandomButton';
import RandomFilters from './RandomFilters/RandomFilters';
import { useLazyGetRandomFilmQuery } from '../../../api/api';
import { useAppSelector } from '../../../store/hooks/redux';
import { convertToQueryParams } from '../../../helpers/convertToQueryParams';
import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './RandomFilm.scss';
import NoResults from '../NoResults/NoResults';
import Loading from '../Loader/Loader';

const RandomFilm = () => {
  const navigate = useNavigate();
  const [showNoResults, setShowNoResults] = useState(false);
  const [requestTriggered, setRequestTriggered] = useState(false);
  const randomFilmFilters = useAppSelector(
    (state) => state.films.randomFilmFilters
  );
  const params = useMemo(
    () => convertToQueryParams(randomFilmFilters),
    [randomFilmFilters]
  );
  const [trigger, { data: FilmData, isLoading, isFetching }] =
    useLazyGetRandomFilmQuery();

  const handleButtonClick: React.MouseEventHandler<HTMLButtonElement> = () => {
    setShowNoResults(false);
    setRequestTriggered(true);
    trigger({ params }, false);
  };

  useEffect(() => {
    if (FilmData && FilmData.id) {
      navigate(`/film/${FilmData.id}`);
    } else if (requestTriggered) {
      setShowNoResults(true);
    }
  }, [FilmData, requestTriggered, navigate]);

  return (
    <main className="main-container">
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <RandomFilters />
          <RandomButton onClick={handleButtonClick} />
          {showNoResults && requestTriggered && (
            <NoResults message="with these filters. Try one more time" />
          )}
        </>
      )}
    </main>
  );
};

export default RandomFilm;
