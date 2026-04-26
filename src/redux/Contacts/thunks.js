import { createAsyncThunk } from '@reduxjs/toolkit';

import {
  getContacts,
  createContact,
  deleteContact,
  updateContact,
} from 'services/apiContacts';

export const getContactsThunk = createAsyncThunk('contacts/fetchAll', () =>
  getContacts()
);

export const createContactThunk = createAsyncThunk(
  'contacts/addContact',
  newData => createContact(newData)
);

export const deleteContactThunk = createAsyncThunk(
  'contacts/deleteContact',
  contactId => deleteContact(contactId)
);

export const updateContactThunk = createAsyncThunk(
  'contacts/updateContact',
  ({ contactId, data }) => updateContact(contactId, data)
);
