// Import Engine Modules
import api from '../utils/api';

// Import Actions
// import { setAlert } from './alert';

// Import Actions Types
import {
    GET_STOCKS,
    GET_STOCK,
    STOCK_ERROR,
    SET_SEARCH_STOCK,
    SET_SEARCH_RESULTS,
    SEARCH_SUCCESS,
    SEARCH_FAILURE,
    SEARCH_STOCK,
} from '../types/stock';

// Get all stocks
export const getAllStocks = () => async (dispatch) => {
  try {
    const res = await api.get('/stocks/all');

    dispatch({
      type: GET_STOCKS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: STOCK_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Get stock by ID
export const getStockById = (id) => async (dispatch) => {
  try {
    const res = await api.get(`/stocks/${id}`);

    dispatch({
      type: GET_STOCK,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: STOCK_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

export const setSearchStock = (query) => async (dispatch) => {
    dispatch({
      type: SET_SEARCH_STOCK,
      payload: query
    });
};

export const setSearchResults = (results) => async (dispatch) => {
  dispatch({
    type: SET_SEARCH_RESULTS,
    payload: results
  });
};

export const searchStock = (query) => async (dispatch) => {
  try {
    dispatch({ type: SEARCH_STOCK });

    const res = await api.post('/stocks/searching/all', { content: query });

    dispatch({
      type: SEARCH_SUCCESS,
      payload: res.data
    });

  } catch (err) {
    dispatch({
      type: SEARCH_FAILURE,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
