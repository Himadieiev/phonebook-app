import { createSlice } from '@reduxjs/toolkit';

import { authInitialState } from './initialState';
import {
  currentUserThunk,
  loginThunk,
  logoutThunk,
  registerThunk,
} from './thunks';

export const authSlice = createSlice({
  name: 'auth',
  initialState: authInitialState,
  extraReducers: builder => {
    builder
      .addCase(registerThunk.fulfilled, (state, action) => {
        state.user = action.payload;
        state.token = action.payload.token;
        state.isLoggedIn = true;
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.user = action.payload;
        state.token = action.payload.token;
        state.isLoggedIn = true;
      })
      .addCase(logoutThunk.fulfilled, state => {
        state.user = { name: null, email: null };
        state.token = null;
        state.isLoggedIn = false;
      })
      .addCase(currentUserThunk.pending, state => {
        state.isFetchingCurrentUser = true;
      })
      .addCase(currentUserThunk.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoggedIn = true;
        state.isFetchingCurrentUser = false;
      })
      .addCase(currentUserThunk.rejected, state => {
        state.isFetchingCurrentUser = false;
      });
  },
});

export const authReducer = authSlice.reducer;
