import { Button } from '../../../ui/button';
import './RandomButton.scss';

type Props = {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
};
const RandomButton = ({ onClick, disabled }: Props) => {
  return (
    <Button
      onClick={onClick}
      type={'submit'}
      title={'Случайный фильм'}
      className={'random-button'}
      disabled={disabled}
    />
  );
};

export default RandomButton;
