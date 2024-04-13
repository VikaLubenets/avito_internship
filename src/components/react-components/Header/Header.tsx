import Search from './Search/Search';
import './Header.scss';
import AuthModal from '../LoginModal/AuthModal';
import { useCallback, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../store/hooks/redux';
import { userSlice } from '../../../store/reducers/userReducer';
import Logo from './Logo/Logo';
import HeaderButtons from './HeaderButtons/HeaderButtons';
import MobileHeader from './MobileHeader/MobileHeader';

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

  useEffect(() => {
    if (authData) {
      onCloseModal();
    }
  }, [authData, onCloseModal]);

  return (
    <>
      <MobileHeader
        onLogout={onLogout}
        isAuth={!!authData}
        onShowModal={onShowModal}
      />
      <header className="header">
        <Logo />
        <Search />
        <HeaderButtons
          onLogout={onLogout}
          isAuth={!!authData}
          onShowModal={onShowModal}
        />
        <AuthModal show={isAuthModal} onHide={onCloseModal} />
      </header>
    </>
  );
};

export default Header;
