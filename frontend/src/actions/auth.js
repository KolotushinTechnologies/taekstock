// Import Engine Modules
import api from '../utils/api';

// Import Actions
import { setAlert } from './alert';

// Import Actions Types
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  USER_ERROR,
  LOGOUT
} from '../types/auth';

/*
  NOTE: we don't need a config object for axios as the
 default headers in axios are already Content-Type: application/json
 also axios stringifies and parses JSON for you, so no need for 
 JSON.stringify or JSON.parse
*/

// Load User
export const loadUser = () => async (dispatch) => {
  try {
    const res = await api.get('/users');

    dispatch({
      type: USER_LOADED,
      payload: res.data.data
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR
    });
  }
};

// Register User
export const register = (formData) => async (dispatch) => {
  try {
    const res = await api.post('/users/register', formData);

    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data
    });
    dispatch(loadUser());
    dispatch(setAlert('Регистрация прошла успешно!', 'success'));
  } catch (err) {
    const error = err.response.data.message;

    if (error) {
      dispatch(setAlert(error, 'danger'));
    }

    dispatch({
      type: REGISTER_FAIL
    });
  }
};

// Login User
export const login = (email, password) => async (dispatch) => {
  const body = { email, password };

  try {
    const res = await api.post('/users/login', body);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data
    });

    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: LOGIN_FAIL
    });
  }
};

export const updateProfile = (formData) => async (dispatch) => {
    try {
      const res = await api.put('/users/update-my-profile', formData);

      dispatch({
        type: USER_LOADED,
        payload: res.data.data
      });

      dispatch(setAlert('Профиль обновлен', 'success'));
    } catch (err) {
      const error = err.response.data.message;

      if (error) {
        dispatch(setAlert(error, 'danger'));
      }

      dispatch({
        type: USER_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status }
      });
    }
  };

// Logout
export const logout = () => ({ type: LOGOUT });
