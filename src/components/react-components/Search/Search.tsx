import { ChangeEvent } from 'react';
import { Button } from '../../ui/button';
import './Search.scss';

const Search = () => {
  return (
    <div className="search-line">
      <input
        type="search"
        onChange={(event: ChangeEvent<HTMLInputElement>) => {
          return event.target;
        }} // update func with real code
      />
      <Button
        type={'button'}
        title={'Search'}
        className={'search-button'}
        onClick={() => {}}
      />
    </div>
  );
};

export default Search;
