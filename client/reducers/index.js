import {
  combineReducers
} from 'redux';
import UserReducer from './userReducer';
import UserListReducer from './userListReducer';
import BookReducer from './bookReducer';
import BookListReducer from './bookListReducer';
import AuthorizeReducer from './AuthorizeReducer';
import ProfileImageReducer from './ProfileImageReducer';

import AvailableBooksReducer from './books/AvailableBooksReducer';
import GetCategoriesReducer from './categories/GetCategoriesReducer';

const rootReducer = combineReducers({
  userReducer: UserReducer,
  userListReducer: UserListReducer,
  bookReducer: BookReducer,
  bookListReducer: BookListReducer,
  authorizeReducer: AuthorizeReducer,
  profileImageReducer: ProfileImageReducer,

  availableBooksReducer: AvailableBooksReducer,
  getCategoriesReducer: GetCategoriesReducer
});

export default rootReducer;
