// Import Actions Types
import {
  REGISTER_SUCCESS,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  USER_ERROR,
  LOGOUT,
  ACCOUNT_DELETED,
  RESET_USER,
} from '../types/auth';

// Create Initial State
const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  loading: true,
  user: null
};

// Create Function For Auth Reducer
function authReducer(state = initialState, action) {
  // Get Type And Payload From Action
  const { type, payload } = action;

  // Actions Types Conditions For Set State
  switch (type) {
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: payload
      };
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false
      };
    case USER_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
        user: null
      };
    case RESET_USER:
      return {
        ...state,
        user: null,
        loading: false
      };
    case ACCOUNT_DELETED:
    case AUTH_ERROR:
    case LOGOUT:
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        user: null
      };
    default:
      return state;
  }
}

// Export Auth Reducer
export default authReducer;
