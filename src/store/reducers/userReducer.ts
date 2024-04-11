import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { USER_LOCALSTORAGE_KEY } from "../../utils/constants";
import { User, UserState } from "../types";

const initialState: UserState = {};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setAuthData: (state, action: PayloadAction<User>) => {
        state.authData = action.payload;
    },
    initAuthData: (state) => {
        const user = localStorage.getItem(USER_LOCALSTORAGE_KEY);
        if (user) {
            state.authData = JSON.parse(user);
        }
    },
    logout: (state) => {
        state.authData = undefined;
        localStorage.removeItem(USER_LOCALSTORAGE_KEY);
    },
},
});