import api from './api';

// store our JWT in LS and set axios headers if we do have a token

const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.authorization = `Bearer ${token}`;
    localStorage.setItem('token', token);
  } else {
    delete api.defaults.headers.authorization;
    localStorage.removeItem('token');
  }
};

export default setAuthToken;
