import axios from 'axios';
import { toast } from 'react-toastify';

axios.defaults.baseURL = 'https://phonebook-api-1mx7.onrender.com';

const token = {
  set(token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  },
  unset() {
    axios.defaults.headers.common.Authorization = '';
  },
};

export const getRegister = async credentials => {
  try {
    const { data } = await axios.post('/api/auth/register', credentials);
    token.set(data.token);
    toast.success('Successfully sigh up');
    return data;
  } catch (e) {
    toast.warning('Something wrong, try again');
    throw e.message;
  }
};

export const getLogin = async credentials => {
  try {
    const { data } = await axios.post('/api/auth/login', credentials);
    token.set(data.token);
    toast.success('Successfully log in');
    return data;
  } catch (e) {
    toast.warning('Something wrong, try again');
    throw e.message;
  }
};

export const getLogout = async () => {
  try {
    await axios.post('/api/auth/logout');
    token.unset();
    toast.success('Successfully log out');
  } catch (e) {
    toast.warning('Something wrong, try again');
    throw e.message;
  }
};

export const getCurrentUser = async (_, thunkAPI) => {
  const state = thunkAPI.getState();
  const persistedToken = state.auth.token;

  if (persistedToken === null) {
    return thunkAPI.rejectWithValue();
  }

  token.set(persistedToken);

  try {
    const { data } = await axios.get('/api/users/current');
    return data;
  } catch (e) {
    throw e.message;
  }
};
