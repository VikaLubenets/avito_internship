import React from 'react';
import { useState } from 'react';
import Pagination from 'react-bootstrap/Pagination';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks/redux';
import { filmsSlice } from '../../../../store/reducers/filmsReducer';
import { IEpisode, SeasonsResponse } from '../../../../store/types';
import { DEFAULT_SEASONS_PER_PAGE } from '../../../../utils/constants';
import { useRenderPaginationItems } from '../../CustomPagination/CustomPagination';
import './SeasonsList.scss';

type Props = {
  seasons: SeasonsResponse;
};

const SeasonsList = ({ seasons }: Props) => {
  const dispatch = useAppDispatch();
  const currentPage = useAppSelector((state) => state.films.pageSeasons);
  const [selectedSeason, setSelectedSeason] = useState<number | null>(null);

  const renderPaginationItems = useRenderPaginationItems({
    currentPage: currentPage,
    totalPages: seasons.pages,
    onPageClick: (page: number) => {
      dispatch(filmsSlice.actions.setPageSeasons(page));
    },
  });

  return (
    <div>
      <ul className="seasons-list">
        {seasons.docs.map((season) => (
          <React.Fragment key={season.number}>
            <div className="seasons-header-container">
              <h2>Season {season.number + 1}</h2>
              <Pagination size="sm" className="pagination">
                {renderPaginationItems()}
              </Pagination>
            </div>
            <div key={season.number} className="seasons-container">
              <div>
                {season.poster.url && (
                  <img
                    className="season-poster"
                    src={season.poster.url}
                    alt={season.enName}
                  />
                )}
              </div>
              <ul className="episodes-list">
                {season.episodes.map((episode: IEpisode) => (
                  <li key={episode.number} className="season-item">
                    <img
                      className="episode-poster"
                      src={episode.still.url}
                      alt={episode.name}
                    />
                    {`${episode.number}. ${episode.name}`}
                  </li>
                ))}
              </ul>
            </div>
          </React.Fragment>
        ))}
      </ul>
    </div>
  );
};

export default SeasonsList;
