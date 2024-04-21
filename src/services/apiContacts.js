import axios from 'axios';
import { toast } from 'react-toastify';

axios.defaults.baseURL = 'https://phonebook-api-1mx7.onrender.com';

export const getContacts = async () => {
  try {
    const response = await axios.get('/api/contacts');
    return response.data;
  } catch (e) {
    toast.warning('Something wrong, try again');
    throw e.message;
  }
};

export const createContact = async newData => {
  try {
    const response = await axios.post('/api/contacts', newData);
    toast.success('Successfully added contact');
    return response.data;
  } catch (e) {
    toast.warning('Something wrong, try again');
    throw e.message;
  }
};

export const deleteContact = async contactId => {
  try {
    const response = await axios.delete(`/api/contacts/${contactId}`);
    toast.success('Successfully deleted contact');
    return response.data;
  } catch (e) {
    toast.warning('Something wrong, try again');
    throw e.message;
  }
};
