import axios from 'axios';
import { toast } from 'react-toastify';

axios.defaults.baseURL = 'https://connections-api.herokuapp.com/';

export const getContacts = async () => {
  try {
    const response = await axios.get('/contacts');
    return response.data;
  } catch (e) {
    toast.warning('Something wrong, try again');
    throw e.message;
  }
};

export const createContacts = async newData => {
  try {
    const response = await axios.post('/contacts', newData);
    toast.success('Successfully added contact');
    return response.data;
  } catch (e) {
    toast.warning('Something wrong, try again');
    throw e.message;
  }
};

export const deleteContacts = async contactId => {
  try {
    const response = await axios.delete(`/contacts/${contactId}`);
    toast.success('Successfully deleted contact');
    return response.data;
  } catch (e) {
    toast.warning('Something wrong, try again');
    throw e.message;
  }
};
