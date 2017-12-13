import {
  createStore,
  applyMiddleware
} from 'redux';
import thunk from 'redux-thunk';
import {
  composeWithDevTools
} from 'redux-devtools-extension';

import rootReducer from '../reducers';

/**
 *
 *
 * @export
 * @param {any} initialState
 * @returns {object} createStore
 */
export default function configureStore(initialState) {
  const composeEnhancers = composeWithDevTools({});
  return createStore(
    rootReducer,
    initialState,
    composeEnhancers(applyMiddleware(thunk))
  );
}
