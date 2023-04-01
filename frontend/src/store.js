// Import Engine Redux
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

// Import Redux Devtools Extension
import { composeWithDevTools } from 'redux-devtools-extension';

// Import Reducers
import rootReducer from './reducers';

// Import Utils
import setAuthToken from './utils/setAuthToken';

// Create Initial State
const initialState = {};

// Connect To Redux Thunk Middleware
const middleware = [thunk];

// Create Store
const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

/*
  NOTE: set up a store subscription listener
  to store the users token in localStorage
 */

/*
  initialize current state from redux store for subscription comparison
  preventing undefined error
 */
let currentState = store.getState();

// Store Subscribe
store.subscribe(() => {
  // keep track of the previous and current state to compare changes
  let previousState = currentState;
  currentState = store.getState();
  // if the token changes set the value in localStorage and axios headers
  if (previousState.auth.token !== currentState.auth.token) {
    const token = currentState.auth.token;
    setAuthToken(token);
  }
});

// Export Store
export default store;
