import RandomButton from './RandomButton/RandomButton';
import './RandomFilm.scss';
import RandomFilters from './RandomFilters/RandomFilters';

const RandomFilm = () => {
  return (
    <main className='main-container'>
      <RandomFilters />
      <RandomButton />
    </main>
  );
};

export default RandomFilm;