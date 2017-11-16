import {
  combineReducers
} from 'redux';
import UserReducer from './UserReducer';
import UserListReducer from './UserListReducer';
import BookReducer from './BookReducer';
import BookListReducer from './BookListReducer';
import AuthorizeReducer from './AuthorizeReducer';
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
