import { useState, useTransition } from 'react';
import Carousel from 'react-bootstrap/esm/Carousel';
import { Link } from 'react-router-dom';
import { chunkArray } from '../../../../helpers/chunkArray';
import { ISimilarMovie } from '../../../../store/types';
import { DEFAULT_ITEMS_PER_CAROUSEL, DEFAULT_ITEMS_PER_CAROUSEL_MOBILE } from '../../../../utils/constants';
import './SimilarFilms.scss';

type Props = {
  similarMovies: ISimilarMovie[];
};

const SimilarFilms = ({ similarMovies }: Props) => {
  const [isPending, startTransition] = useTransition();
  const [index, setIndex] = useState(0);
  const { innerWidth: width} = window;

  const handleSelect = (selectedIndex: number) => {
    if (isPending) return;

    startTransition(() => {
      setIndex(selectedIndex);
    });
  };

  const chunkedMovies = chunkArray(
    similarMovies, 
    width > 768 ? 
    DEFAULT_ITEMS_PER_CAROUSEL : 
    DEFAULT_ITEMS_PER_CAROUSEL_MOBILE
  );

  return (
    <div className="similar-films">
      <h2>Похожие фильмы:</h2>
      <Carousel
        slide={false}
        touch={true}
        activeIndex={index}
        onSelect={handleSelect}
      >
        {chunkedMovies.map((chunk) => (
          <Carousel.Item key={JSON.stringify(chunk)}>
            <div className="carousel-row">
              {chunk.map((movie) => (
                <Link
                  to={`/film/${movie.id}`}
                  className="film-container"
                  key={movie.id}
                >
                  <div>
                    <img
                      className="film-img"
                      src={movie.poster.url}
                      alt={movie.name}
                    />
                  </div>
                </Link>
              ))}
            </div>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
};

export default SimilarFilms;
