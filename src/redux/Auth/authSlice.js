import { createSlice } from '@reduxjs/toolkit';

import { authInitialState } from './initialState';
import { currentUserThunk, loginThunk, logoutThunk, registerThunk } from './thunks';

export const authSlice = createSlice({
  name: 'auth',
  initialState: authInitialState,
  extraReducers: {
    [registerThunk.fulfilled](state, action) {
      state.user = action.payload;
      state.token = action.payload.token;
      state.isLoggedIn = true;
    },
    [loginThunk.fulfilled](state, action) {
      console.log(action);
      state.user = action.payload;
      state.token = action.payload.token;
      state.isLoggedIn = true;
    },
    [logoutThunk.fulfilled](state, action) {
      state.user = { name: null, email: null };
      state.token = null;
      state.isLoggedIn = false;
    },
    [currentUserThunk.pending](state, action) {
      state.isFetchingCurrentUser = true;
    },
    [currentUserThunk.fulfilled](state, action) {
      state.user = action.payload;
      state.isLoggedIn = true;
      state.isFetchingCurrentUser = false;
    },
    [currentUserThunk.rejected](state, action) {
      state.isFetchingCurrentUser = false;
    },
  },
});

export const authReducer = authSlice.reducer;
