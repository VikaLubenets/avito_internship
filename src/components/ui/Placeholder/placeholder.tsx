import './placeholder.scss';

type PlaceholderProps = {
  message: string;
  className?: string;
};

const Placeholder = ({ message, className }: PlaceholderProps) => {
  return (
    <div className={`placeholder-text ${className}`}>
      {message}
    </div>
  );
};

export default Placeholder;
