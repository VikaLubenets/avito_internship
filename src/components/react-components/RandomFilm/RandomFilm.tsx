import RandomButton from './RandomButton/RandomButton';
import RandomFilmCard from './RandomFilmCard/RandomFilmCard';
import RandomFilters from './RandomFilters/RandomFilters';
import './RandomFilm.scss';
import { useLazyGetRandomFilmQuery } from '../../../api/api';
import { useAppSelector } from '../../../store/hooks/redux';
import { normalizeRandomFilmFilters } from '../../../helpers/normalizeRandomFilters';
import { useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

const RandomFilm = () => {
  const randomFilmFilters = useAppSelector(
    (state) => state.films.randomFilmFilters
  );
  const params = useMemo(
    () => normalizeRandomFilmFilters(randomFilmFilters),
    [randomFilmFilters]
  );
  const [trigger, { data: FilmData, isLoading }] = useLazyGetRandomFilmQuery();

  const navigate = useNavigate();

  const handleButtonClick: React.MouseEventHandler<HTMLButtonElement> = () => {
    trigger({ params }, false);
  };

  useEffect(() => {
    if (FilmData && FilmData.id) {
      navigate(`/film/${FilmData.id}`);
    }
  }, [FilmData, navigate]);

  return (
    <main className="main-container">
      <RandomFilters />
      <RandomButton onClick={handleButtonClick} />
    </main>
  );
};

export default RandomFilm;
