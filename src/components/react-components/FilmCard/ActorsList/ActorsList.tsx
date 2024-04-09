import React, { useState } from 'react';
import Pagination from 'react-bootstrap/Pagination';
import { DEFAULT_ACTORS_PER_PAGE, DEFAULT_PAGE } from '../../../../utils/constants';
import type { FilmPersonType } from '../../../../store/types';
import './ActorsList.scss';
import { useRenderPaginationItems } from '../../Pagination/Pagination';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks/redux';
import { filmsSlice } from '../../../../store/reducers/filmsReducer';

type Props = {
  actors: FilmPersonType[];
};

const ActorsList: React.FC<Props> = ({ actors }) => {
  const itemsPerPage = DEFAULT_ACTORS_PER_PAGE;
  const dispatch = useAppDispatch();
  const currentPage = useAppSelector((state) => state.films.pageActors);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, actors.length);

  const renderPaginationItems = useRenderPaginationItems({
    currentPage: currentPage,
    totalPages: Math.ceil(actors.length / itemsPerPage),
    onPageClick: (page: number) => {
      dispatch(filmsSlice.actions.setPageActors(page));
    },
  });

  return (
    <div>
      <ul className='actors-container'>
        {actors.slice(startIndex, endIndex).map((actor) => (
          <li key={actor.id} className="actor-container">
            <img className='actors-image' src={actor.photo} alt={actor.name} />
            <p>{actor.name}</p>
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