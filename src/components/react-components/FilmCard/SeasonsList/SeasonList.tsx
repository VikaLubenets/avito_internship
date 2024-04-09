import Pagination from 'react-bootstrap/Pagination';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks/redux';
import { filmsSlice } from '../../../../store/reducers/filmsReducer';
import { SeasonsResponse } from '../../../../store/types';
import { DEFAULT_SEASONS_PER_PAGE } from '../../../../utils/constants';
import { useRenderPaginationItems } from '../../Pagination/Pagination';
import './SeasonsList.scss';

type Props = {
  seasons: SeasonsResponse;
};

const SeasonsList = ({ seasons }: Props) => {
  const itemsPerPage = DEFAULT_SEASONS_PER_PAGE;
  
  const dispatch = useAppDispatch();
  const currentPage = useAppSelector((state) => state.films.pageSeasons);

  const renderPaginationItems = useRenderPaginationItems({
    currentPage: currentPage,
    totalPages: Math.ceil(seasons.total / itemsPerPage),
    onPageClick: (page: number) => {
      dispatch(filmsSlice.actions.setPageSeasons(page));
    },
  });

  return (
    <div>
      <ul className='seasons-list'>
        {seasons.docs.map((season, index) => (
          <li key={index} className='season-item'>
            Season {season.number}: {season.episodes.length} episodes
          </li>
        ))}
      </ul>
      <Pagination size="sm" className="pagination">
        {renderPaginationItems()}
      </Pagination>
    </div>
  );
};

export default SeasonsList;