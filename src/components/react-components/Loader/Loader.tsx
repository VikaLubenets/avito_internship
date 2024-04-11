import { Loader } from 'lucide-react';
import './Loader.module.scss';

const Loading = () => {
  return (
    <div className="loader">
      <Loader className="spinner" />
    </div>
  );
};

export default Loading;
