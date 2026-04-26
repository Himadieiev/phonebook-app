import { createSlice, isAnyOf } from '@reduxjs/toolkit';

import { contactInitialState } from './initialState';
import {
  createContactThunk,
  deleteContactThunk,
  getContactsThunk,
  updateContactThunk,
} from './thunks';

const handlePending = state => {
  state.isLoading = true;
};

const handleFulfilledGet = (state, { payload }) => {
  state.isLoading = false;
  state.error = null;
  state.items = payload;
};

const handleFulfilledCreate = (state, { payload }) => {
  state.isLoading = false;
  state.error = null;
  state.items.push(payload);
};

const handleFulfilledDel = (state, { payload }) => {
  state.isLoading = false;
  state.error = null;
  state.items = state.items.filter(e => e.id !== payload.id);
};

const handleFulfilledUpdate = (state, { payload }) => {
  state.isLoading = false;
  state.error = null;
  const index = state.items.findIndex(item => item._id === payload._id);
  if (index !== -1) {
    state.items[index] = payload;
  }
};

const handleRejected = (state, { payload }) => {
  state.isLoading = false;
  state.error = payload;
};

export const contactsSlice = createSlice({
  name: 'contacts',
  initialState: contactInitialState,
  extraReducers: builder => {
    builder
      .addCase(getContactsThunk.fulfilled, handleFulfilledGet)
      .addCase(createContactThunk.fulfilled, handleFulfilledCreate)
      .addCase(deleteContactThunk.fulfilled, handleFulfilledDel)
      .addCase(updateContactThunk.fulfilled, handleFulfilledUpdate)
      .addMatcher(
        isAnyOf(
          getContactsThunk.pending,
          createContactThunk.pending,
          deleteContactThunk.pending,
          updateContactThunk.pending
        ),
        handlePending
      )
      .addMatcher(
        isAnyOf(
          getContactsThunk.rejected,
          createContactThunk.rejected,
          deleteContactThunk.rejected,
          updateContactThunk.rejected
        ),
        handleRejected
      );
  },
});

export const contactsReducer = contactsSlice.reducer;
