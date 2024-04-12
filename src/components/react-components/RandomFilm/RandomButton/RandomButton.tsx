import { Button } from '../../../ui/button';
import './RandomButton.scss';

type Props = {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
};
const RandomButton = ({ onClick }: Props) => {
  return (
    <Button
      onClick={onClick}
      type={'submit'}
      title={'Случайный фильм'}
      className={'random-button'}
    />
  );
};

export default RandomButton;
