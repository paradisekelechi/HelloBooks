import {createStore, applyMiddleware} from 'redux';
import rootReducer from '../reducers/userReducer';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';

/**
 * 
 * 
 * @export
 * @param {any} initialState 
 * @returns {object} createStore
 */
export default function configureStore(initialState){
    return createStore(
        rootReducer,
        initialState,
        applyMiddleware(reduxImmutableStateInvariant())
    );
}