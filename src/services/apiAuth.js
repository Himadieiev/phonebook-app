import axios from 'axios';

axios.defaults.baseURL = 'https://connections-api.herokuapp.com/';

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
    const { data } = await axios.post('/users/signup', credentials);
    token.set(data.token);
    return data;
  } catch (e) {
    throw e.message;
  }
};

export const getLogin = async credentials => {
  try {
    const { data } = await axios.post('/users/login', credentials);
    token.set(data.token);
    return data;
  } catch (e) {
    throw e.message;
  }
};

export const getLogout = async () => {
  try {
    await axios.post('/users/logout');
    token.unset();
  } catch (e) {
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
    const { data } = await axios.get('/users/current');
    return data;
  } catch (e) {
    throw e.message;
  }
};
