import { createAsyncThunk } from '@reduxjs/toolkit';
import { userSlice } from '../store/reducers/userReducer';
import { LoginByUserNameProps, User } from '../store/types';
import { USER_LOCALSTORAGE_KEY } from '../utils/constants';


export const loginByUserName = createAsyncThunk<User, LoginByUserNameProps>(
  'login/loginByUserName',
  async ({ username, password }: LoginByUserNameProps, thunkAPI) => {
    try {
      //FOR REAL CASE:
      // const response = await fetch('request to server', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({ username, password }),
      // });

      // if (!response.ok) {
      //   throw new Error('Network response has been failed');
      // }

      // const data = await response.json();
      // return data;

      //FOR TEST FAKE_BACKEND:
      const response = await fetch('./usersData.json');
      if (!response.ok) {
        throw new Error('Network response failed');
      }
      const data = await response.json();
      const users = data.users;
      const user = users.find((user: User) => user.username === username && user.password === password);

      if (user) {
        localStorage.setItem(USER_LOCALSTORAGE_KEY, JSON.stringify(user));
        thunkAPI.dispatch(userSlice.actions.setAuthData(user))
        return user;
      } else {
        throw new Error('Invalid username or password');
      }

    } catch (unknownError) {
      let error: Error;
      if (unknownError instanceof Error) {
        error = unknownError;
      } else {
        error = new Error('Unknown error occurred');
      }
      return thunkAPI.rejectWithValue(error.message);
  }
});

