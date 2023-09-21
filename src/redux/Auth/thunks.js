import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  getCurrentUser,
  getLogin,
  getLogout,
  getRegister,
} from 'services/apiAuth';

export const registerThunk = createAsyncThunk('auth/register', credentials =>
  getRegister(credentials)
);

export const loginThunk = createAsyncThunk('auth/login', credentials =>
  getLogin(credentials)
);

export const logoutThunk = createAsyncThunk('auth/logout', () => getLogout());

export const currentUserThunk = createAsyncThunk(
  'auth/refresh',
  (_, thunkAPI) => getCurrentUser(_, thunkAPI)
);
