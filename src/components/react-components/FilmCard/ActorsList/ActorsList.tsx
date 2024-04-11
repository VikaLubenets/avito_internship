import Pagination from 'react-bootstrap/Pagination';
import { DEFAULT_ACTORS_PER_PAGE } from '../../../../utils/constants';
import type { FilmPersonType } from '../../../../store/types';
import { useRenderPaginationItems } from '../../CustomPagination/CustomPagination';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks/redux';
import { filmsSlice } from '../../../../store/reducers/filmsReducer';
import './ActorsList.scss';

type Props = {
  actors: FilmPersonType[];
};

const ActorsList: React.FC<Props> = ({ actors }) => {
  const itemsPerPage = DEFAULT_ACTORS_PER_PAGE;
  const dispatch = useAppDispatch();
  const currentPage = useAppSelector((state) => state.films.pageActors);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, actors.length - 1);

  const renderPaginationItems = useRenderPaginationItems({
    currentPage: currentPage,
    totalPages: Math.ceil(actors.length / itemsPerPage),
    onPageClick: (page: number) => {
      dispatch(filmsSlice.actions.setPageActors(page));
    },
  });

  return (
    <div className="actors-container">
      <h2>Актеры</h2>
      <ul className="actors-row">
        {actors.slice(startIndex, endIndex).map((actor) => (
          <li key={actor.id} className="actor-container">
            <img className="actors-image" src={actor.photo} alt={actor.name} />
            <p className="actor-name">{actor.name}</p>
          </li>
        ))}
      </ul>
      <Pagination size="sm" className="pagination">
        {renderPaginationItems()}
      </Pagination>
    </div>
  );
};

export default ActorsList;
