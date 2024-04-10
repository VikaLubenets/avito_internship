import './placeholder.scss';

type PlaceholderProps = {
  message: string;
};

const Placeholder = ({ message }: PlaceholderProps) => {
  return (
    <div className="placeholder">
      <p>{message}</p>
    </div>
  );
};

export default Placeholder;