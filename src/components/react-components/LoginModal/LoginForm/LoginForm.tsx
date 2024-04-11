import { memo, useCallback } from "react";
import { loginByUserName } from "../../../../auth/loginByUserName";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks/redux";
import { loginSlice } from "../../../../store/reducers/loginReducer";
import { Button } from "../../../ui/button";
import Placeholder from "../../../ui/Placeholder/placeholder";
import './LoginForm.scss';

const LoginForm = memo(() => {
  const dispatch = useAppDispatch();
  const username = useAppSelector(slice => slice.login.loginName);
  const password = useAppSelector(slice => slice.login.password);
  const error = useAppSelector(slice => slice.login.error);  
  const isLoading = useAppSelector(slice => slice.login.isLoading);

  const onChangeUsername = useCallback((value: string) => {
    dispatch(loginSlice.actions.setLoginName(value));
  }, [dispatch]);

  const onChangePassword = useCallback((value: string) => {
    dispatch(loginSlice.actions.setPassword(value));
  }, [dispatch]);

  const onLoginClick = useCallback(() => {
    dispatch(loginByUserName({username, password}))
  }, [dispatch, password, username]);

  return (
      <div className='login-form'>
          <h2>
            Форма авторизации
          </h2>
          {error && <Placeholder className="error" message='Вы ввели неверный логин или пароль'/>}
          <div className="login-container">
            <div className="field-container">
                <label htmlFor="username">
                    Логин:
                    <input
                        id="username"
                        name="username"
                        className="login-input"
                        type="text"
                        placeholder="Введите логин"
                        onChange={(e) => onChangeUsername(e.target.value)}
                        value={username}
                    />
                </label>
            </div>
            <div className="field-container">
                <label htmlFor="password">
                    Пароль:
                    <input
                        id="password"
                        name="password"
                        className="login-input"
                        type="password"
                        placeholder="Введите пароль"
                        onChange={(e) => onChangePassword(e.target.value)}
                        value={password}
                    />
                </label>
            </div>
            <Button
                className='login-btn'
                onClick={onLoginClick}
                disabled={isLoading}
                title='Войти'
                type="submit"
            />
          </div>
      </div>
  );
});

export default LoginForm;