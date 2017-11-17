import {
  combineReducers
} from 'redux';
import UserReducer from './userReducer';
import UserListReducer from './userListReducer';
import BookReducer from './bookReducer';
import BookListReducer from './bookListReducer';
import AuthorizeReducer from './authorizeReducer';
import ProfileImageReducer from './ProfileImageReducer';

const rootReducer = combineReducers({
  userReducer: UserReducer,
  userListReducer: UserListReducer,
  bookReducer: BookReducer,
  bookListReducer: BookListReducer,
  authorizeReducer: AuthorizeReducer,
  profileImageReducer: ProfileImageReducer
});

export default rootReducer;
