import Search from './Search/Search';
import './Header.scss';
import { Button } from '../../ui/button';
import AuthModal from '../LoginModal/AuthModal';
import { useCallback, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../store/hooks/redux';
import { userSlice } from '../../../store/reducers/userReducer';

const Header = () => {
  const [isAuthModal, setIsAuthModal] = useState(false);
  const authData = useAppSelector((state) => state.user.authData);
  const dispatch = useAppDispatch();

  const onCloseModal = useCallback(() => {
    setIsAuthModal(false);
  }, []);

  const onShowModal = useCallback(() => {
    setIsAuthModal(true);
  }, []);

  const onLogout = useCallback(() => {
    dispatch(userSlice.actions.logout());
  }, [dispatch]);

  if (authData) {
    return (
      <header className="header">
      <h1 className="logo-text">ФИЛЬМОТЕКА</h1>
      <Search />
      <Button
          onClick={onLogout}
          type={'button'}
          title={'Выйти'}
          className={'login-button'}
        />
    </header>
    );
  }

  return (
    <header className="header">
      <h1 className="logo-text">ФИЛЬМОТЕКА</h1>
      <Search />
      <Button 
        type={'button'} 
        title={'Войти'} 
        className={'login-button'} 
        onClick={onShowModal}
      />
      <AuthModal
        show={isAuthModal}
        onHide={onCloseModal}
      />
    </header>
  );
};

export default Header;
