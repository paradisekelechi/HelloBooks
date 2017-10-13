import {combineReducers} from 'redux';
import UserReducer from './userReducer';
import UserListReducer from './userListReducer';
import BookReducer from './bookReducer';
import BookListReducer from './bookListReducer';

const rootReducer = combineReducers({
    userReducer: UserReducer,
    userListReducer: UserListReducer,
    bookReducer: BookReducer,
    bookListReducer: BookListReducer
});

export default rootReducer;