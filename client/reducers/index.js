import {
  combineReducers
} from 'redux';
import UserReducer from './UserReducer';
import UserListReducer from './UserListReducer';
import BookReducer from './BookReducer';
import BookListReducer from './BookListReducer';

const rootReducer = combineReducers({
  userReducer: UserReducer,
  userListReducer: UserListReducer,
  bookReducer: BookReducer,
  bookListReducer: BookListReducer
});

export default rootReducer;
