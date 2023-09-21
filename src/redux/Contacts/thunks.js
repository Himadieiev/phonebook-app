import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  getContacts,
  createContacts,
  deleteContacts,
} from 'services/apiContacts';

export const getContactsThunk = createAsyncThunk('contacts/fetchAll', () =>
  getContacts()
);

export const createContactsThunk = createAsyncThunk(
  'contacts/addContact',
  newData => createContacts(newData)
);

export const deleteContactsThunk = createAsyncThunk(
  'contacts/deleteContact',
  contactId => deleteContacts(contactId)
);
