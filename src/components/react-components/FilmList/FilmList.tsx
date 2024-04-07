import React from 'react';
import { useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../store/hooks/redux';
import Card from './Card';
import './FilmList.scss';

const FilmList = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const searchResults = useAppSelector((state) => state.films.searchResults.docs);

  return (
    <React.Fragment>
      {!searchResults || !searchResults.length ? (
        <div className="no-results">No results</div>
      ) : (
        searchResults.map((result, index) => (
          <Card key={result.id} result={result} index={index} />
        ))
      )}
    </React.Fragment>
  );
};

export default FilmList;
