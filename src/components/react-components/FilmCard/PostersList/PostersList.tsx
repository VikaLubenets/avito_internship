import { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import Pagination from 'react-bootstrap/Pagination';
import { useAppDispatch, useAppSelector } from "../../../../store/hooks/redux";
import { filmsSlice } from "../../../../store/reducers/filmsReducer";
import type { PostersResponse } from '../../../../store/types';
import { DEFAULT_POSTERS_PER_PAGE } from "../../../../utils/constants";
import { useRenderPaginationItems } from "../../Pagination/Pagination";
import './PostersList.scss';

type Props = {
  posters: PostersResponse;
}

const PostersList = ({ posters }: Props) => {
  const itemsPerPage = DEFAULT_POSTERS_PER_PAGE;

  const dispatch = useAppDispatch();
  const currentPage = useAppSelector((state) => state.films.pagePosters);

  const renderPaginationItems = useRenderPaginationItems({
    currentPage: currentPage,
    totalPages: Math.ceil(posters.docs.length / itemsPerPage),
    onPageClick: (page: number) => {
      dispatch(filmsSlice.actions.setPagePosters(page));
    },
  });

  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex: number) => {
    setIndex(selectedIndex);
  };

  return (
    <div className="posters-container">
        <div className="posters-images-line">
          <Carousel activeIndex={index} onSelect={handleSelect}>
            {posters.docs.map((poster, index) => (
              <Carousel.Item>
                <div key={index} className="poster-item">
                  <img src={poster.url} className='poster-item' alt={poster.type} width={poster.width} height={poster.height}/>
                </div>
              </Carousel.Item>
              ))}
        </Carousel>        
      </div>
      <Pagination size="sm" className="pagination">
        {renderPaginationItems()}
      </Pagination>
    </div>
  );
};

export default PostersList;