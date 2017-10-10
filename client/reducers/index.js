import {combineReducers} from 'redux';
import UserReducer from './userReducer';

const rootReducer = combineReducers({
    users: UserReducer
});

export default rootReducer;