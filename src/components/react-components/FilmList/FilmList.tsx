import React from 'react';
import './FilmList.scss';

const FilmList = () => {
  const filmData: string[] = [];

  return (
    <React.Fragment>
      {!filmData || !filmData.length ? (
        <div className="no-results">No results</div>
      ) : (
          <div>cards</div>
      )}
    </React.Fragment>
  );
};

export default FilmList;
