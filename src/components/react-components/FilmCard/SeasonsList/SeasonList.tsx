import React, { useState, useEffect, useCallback } from 'react';
import Pagination from 'react-bootstrap/Pagination';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks/redux';
import { filmsSlice } from '../../../../store/reducers/filmsReducer';
import { IEpisode, SeasonsResponse } from '../../../../store/types';
import './SeasonsList.scss';

type Props = {
  seasons: SeasonsResponse;
};

const SeasonsList = ({ seasons }: Props) => {
  const dispatch = useAppDispatch();
  const currentPage = useAppSelector((state) => state.films.pageSeasons);
  const [paginationItems, setPaginationItems] = useState<JSX.Element[]>([]);

  const onClick = useCallback(
    (page: number) => {
      dispatch(filmsSlice.actions.setPageSeasons(page));
    },
    [dispatch]
  );

  useEffect(() => {
    const makePagination = (total: number) => {
      const items: JSX.Element[] = [];
      for (let number = 1; number <= total; number++) {
        items.push(
          <Pagination.Item
            key={number}
            active={number === currentPage}
            onClick={() => onClick(number)}
          >
            {total - number ?? 0}
          </Pagination.Item>
        );
      }
      setPaginationItems(items.reverse());
    };

    makePagination(seasons.total);
  }, [currentPage, seasons.total, onClick]);

  return (
    <div>
      <ul className="seasons-list">
        {seasons.docs.map((season) => (
          <React.Fragment key={season.number}>
            <div className="seasons-header-container">
              <h2>Season {season.number}</h2>
              <Pagination size="sm" className="pagination">
                {paginationItems}
              </Pagination>
            </div>
            <div key={season.number} className="seasons-container">
              <div>
                {season.poster && season.poster.url && (
                  <img
                    className="season-poster"
                    src={season.poster.url ?? './no_image.svg'}
                    alt={season.enName ?? 'Название сезона отсутствует'}
                  />
                )}
              </div>
              <ul className="episodes-list">
                {season.episodes.map((episode: IEpisode) => (
                  <li key={episode.number} className="season-item">
                    { episode.still && <img
                      className="episode-poster"
                      src={episode.still.url ?? './no_image.svg'}
                      alt={episode.name ?? 'Название эпизода отсутствует'}
                    /> }
                    {`${episode.name ?? 'Название эпизода отсутствует'}`}
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
