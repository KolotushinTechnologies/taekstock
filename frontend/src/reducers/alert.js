// Import Actions Types
import { SET_ALERT, REMOVE_ALERT } from '../types/alert';

// Create Initial State
const initialState = [];

// Create Function For Alert Reducer
function alertReducer(state = initialState, action) {
  // Get Type And Payload From Action
  const { type, payload } = action;

  // Actions Types Conditions For Set State
  switch (type) {
    case SET_ALERT:
      return [...state, payload];
    case REMOVE_ALERT:
      return state.filter((alert) => alert.id !== payload);
    default:
      return state;
  }
}

// Export Alert Reducer
export default alertReducer;
