// Import Engine Modules
import api from '../utils/api';

// Import Actions
// import { setAlert } from './alert';

// Import Actions Types
import {
    GET_STOCKS,
    GET_STOCK,
    STOCK_ERROR,
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
