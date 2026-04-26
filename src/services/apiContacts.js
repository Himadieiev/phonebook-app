import axios from 'axios';

axios.defaults.baseURL = 'https://phonebook-api-1mx7.onrender.com';
// axios.defaults.baseURL = 'http://localhost:5000';  // для тестування серверу в режимі розробки

export const getContacts = async () => {
  try {
    const response = await axios.get('/api/contacts');
    return response.data;
  } catch (e) {
    if (e.response && e.response.status === 404) {
      return [];
    }
    throw e.message;
  }
};

export const createContact = async newData => {
  try {
    const response = await axios.post('/api/contacts', newData);
    return response.data;
  } catch (e) {
    throw e.message;
  }
};

export const deleteContact = async contactId => {
  try {
    const response = await axios.delete(`/api/contacts/${contactId}`);
    return response.data;
  } catch (e) {
    throw e.message;
  }
};

export const updateContact = async (contactId, updatedData) => {
  try {
    const response = await axios.put(`/api/contacts/${contactId}`, updatedData);
    return response.data;
  } catch (e) {
    throw e.message;
  }
};
