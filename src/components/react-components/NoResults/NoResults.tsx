import { memo } from 'react';
import './NoResults.scss';

type Props = {
  message?: string;
};

const NoResults = memo(({ message }: Props) => {
  return <div className="no-results">No results {message}</div>;
});

export default NoResults;
