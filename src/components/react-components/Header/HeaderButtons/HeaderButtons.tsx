import { Link } from 'react-router-dom';
import { Button } from '../../../ui/button';
import './HeaderButtons.scss';

type Props = {
  onLogout: () => void;
  isAuth: boolean;
  onShowModal: () => void;
}

const HeaderButtons = ({
  onLogout, 
  isAuth,
  onShowModal
}: Props) => {
  return (
    <>
      { isAuth ? 
      <div className='header-buttons-container'>
        <Button
          onClick={onLogout}
          type={'button'}
          title={'Выйти'}
          className={'login-button'}
        /> 
        <Link to={'/randomFilm'}>
          <Button
            type={'button'}
            title={'Случайный фильм'}
            className={'random-film-button'}
          />
        </Link>
      </div>
      :
      <Button
        type={'button'}
        title={'Войти'}
        className={'login-button'}
        onClick={onShowModal}
      />
      }
    </>
  )
};

export default HeaderButtons;