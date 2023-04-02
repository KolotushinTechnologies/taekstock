// Import Engine Redux
import { combineReducers } from 'redux';

// Import Reducers
import alert from './alert';
import auth from './auth';
import stock from './stock';

// Export Combine Reducers
export default combineReducers({
  alert,
  auth,
  stock,
});

