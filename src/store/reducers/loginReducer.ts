import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { loginByUserName } from "../../auth/loginByUserName";
import { LoginState } from "../types";

const initialState: LoginState = {
  loginName: '',
  password: '',
  isLoading: false,
  error: undefined,
};

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    setLoginName(state, action: PayloadAction<string>) {
      state.loginName = action.payload;
    },
    setPassword(state, action: PayloadAction<string>) {
      state.password = action.payload;
    },
    setIsLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginByUserName.pending, (state, action) => {
      state.error = undefined;
      state.isLoading = true;
    }),
    builder.addCase(loginByUserName.fulfilled, (state, action) => {
      state.isLoading = false;
    }),
    builder.addCase(loginByUserName.rejected, (state, action) => {
      state.error = String(action.payload);
      state.isLoading = false;
    })
  },
});