import { useState, useTransition } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import { chunkArray } from '../../../../helpers/chunkArray';
import type { PostersResponse } from '../../../../store/types';
import {
  DEFAULT_ITEMS_PER_CAROUSEL_POSTERS,
  DEFAULT_POSTERS_PER_PAGE,
} from '../../../../utils/constants';
import './PostersList.scss';

type Props = {
  posters: PostersResponse;
};

const PostersList = ({ posters }: Props) => {
  const [isPending, startTransition] = useTransition();
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex: number) => {
    if (isPending) return;

    startTransition(() => {
      setIndex(selectedIndex);
    });
    console.log(posters.docs);
    console.log(chunkedPosters);
  };

  const chunkedPosters = chunkArray(
    posters.docs,
    DEFAULT_ITEMS_PER_CAROUSEL_POSTERS
  );

  return (
    <div className="posters-container">
      <div className="posters-images-line">
        <Carousel activeIndex={index} onSelect={handleSelect}>
          {chunkedPosters.map((chunk) => (
            <Carousel.Item key={JSON.stringify(chunk)}>
              <div className="posters-row">
                {chunk.map((poster) => (
                  <div key={poster.id} className="poster-item">
                    <img
                      src={poster.url}
                      className="poster-item"
                      alt={poster.type}
                      width={Math.ceil(poster.width / 4)}
                      height={Math.ceil(poster.height / 4)}
                    />
                  </div>
                ))}
              </div>
            </Carousel.Item>
          ))}
        </Carousel>
      </div>
    </div>
  );
};

export default PostersList;
