import { Loader } from 'lucide-react';
import './Loader.scss';

const Loading = () => {
  return (
    <div className="loader">
      <Loader className="spinner" />
    </div>
  );
};

export default Loading;
