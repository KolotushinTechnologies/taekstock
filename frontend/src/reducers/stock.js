// Import Actions Types
import {
    GET_STOCKS,
    GET_STOCK,
    STOCK_ERROR,
} from '../types/stock';

// Create Initial State
const initialState = {
    stocks: [],
    stock: null,
    loading: true,
    error: {}
};

// Create Function For Stock Reducer
function stockReducer(state = initialState, action) {
    // Get Type And Payload From Action
    const { type, payload } = action;

    // Actions Types Conditions For Set State
    switch (type) {
        case GET_STOCKS:
            return {
                ...state,
                stocks: payload,
                loading: false
            };
        case GET_STOCK:
            return {
                ...state,
                stock: payload,
                loading: false
            };
        case STOCK_ERROR:
            return {
                ...state,
                error: payload,
                loading: false
            };
        default:
            return state;
    }
}

// Export Stock Reducer
export default stockReducer;
