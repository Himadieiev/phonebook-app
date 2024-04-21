import { createAsyncThunk } from '@reduxjs/toolkit';

import { getContacts, createContact, deleteContact } from 'services/apiContacts';

export const getContactsThunk = createAsyncThunk('contacts/fetchAll', () => getContacts());

export const createContactThunk = createAsyncThunk('contacts/addContact', newData =>
  createContact(newData)
);

export const deleteContactThunk = createAsyncThunk('contacts/deleteContact', contactId =>
  deleteContact(contactId)
);
