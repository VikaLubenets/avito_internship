import { memo } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../../ui/button';
import './ReturnButton.scss';

const ReturnButton = memo(() => {
  return (
    <Link to={'/'}>
      <Button
        type={'button'}
        title={'На главную'}
        className={'return-button'}
      />
    </Link>
  );
});

export default ReturnButton;
