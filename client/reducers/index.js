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
import PendingBooksReducer from './books/PendingBooksReducer';
import GetCategoriesReducer from './categories/GetCategoriesReducer';
import BorrowBookReducer from './borrow/BorrowBookReducer';
import ReturnBookReducer from './borrow/ReturnBookReducer';
import GetSingleBookReducer from './books/GetSingleBookReducer';

const rootReducer = combineReducers({
  userReducer: UserReducer,
  userListReducer: UserListReducer,
  bookReducer: BookReducer,
  bookListReducer: BookListReducer,
  authorizeReducer: AuthorizeReducer,
  profileImageReducer: ProfileImageReducer,

  availableBooksReducer: AvailableBooksReducer,
  getCategoriesReducer: GetCategoriesReducer,
  borrowBookReducer: BorrowBookReducer,
  returnBookReducer: ReturnBookReducer,
  pendingBooksReducer: PendingBooksReducer,
  getSingleBookReducer: GetSingleBookReducer
});

export default rootReducer;
