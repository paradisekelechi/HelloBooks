import {
  combineReducers
} from 'redux';
import SignupReducer from './authentication/SignupReducer';
import SigninReducer from './authentication/SigninReducer';
import GoogleSigninReducer from './authentication/GoogleSigninReducer';
import GetAllUsersReducer from './users/GetAllUsersReducer';
import GetAdminUsersReducer from './users/GetAdminUsersReducer';
import GetClientUsersReducer from './users/GetClientUsersReducer';
import GetDeletedUsersReducer from './users/GetDeletedUsersReducer';
import ProfileImageReducer from './profile/ProfileImageReducer';
import AvailableBooksReducer from './books/AvailableBooksReducer';
import PendingBooksReducer from './books/PendingBooksReducer';
import GetCategoriesReducer from './categories/GetCategoriesReducer';
import BorrowBookReducer from './borrow/BorrowBookReducer';
import ReturnBookReducer from './borrow/ReturnBookReducer';
import GetSingleBookReducer from './books/GetSingleBookReducer';
import GetDeletedBooksReducer from './books/GetDeletedBooksReducer';
import GetBooksReducer from './books/GetBooksReducer';
import GetAvailableBooksReducer from './books/GetAvailableBooksReducer';
import GetFinishedBooksReducer from './books/GetFinishedBooksReducer';
import EditBookReducer from './books/EditBookReducer';
import AddBookReducer from './books/AddBookReducer';
import DeleteBookReducer from './books/DeleteBookReducer';
import GetUsertypesReducer from './usertypes/GetUsertypesReducer';
import GetAccountTypesReducer from './accounttypes/GetAccountTypesReducer';
import AddCategoryReducer from './categories/AddCategoryReducer';

const rootReducer = combineReducers({
  signupReducer: SignupReducer,
  signinReducer: SigninReducer,
  googleSigninReducer: GoogleSigninReducer,

  getAllUsersReducer: GetAllUsersReducer,
  getAdminUsersReducer: GetAdminUsersReducer,
  getClientUsersReducer: GetClientUsersReducer,
  getDeletedUsersReducer: GetDeletedUsersReducer,

  getSingleBookReducer: GetSingleBookReducer,
  getBooksReducer: GetBooksReducer,
  getAvailableBooksReducer: GetAvailableBooksReducer,
  getFinishedBooksReducer: GetFinishedBooksReducer,
  getDeletedBooksReducer: GetDeletedBooksReducer,

  editBookReducer: EditBookReducer,
  addBookReducer: AddBookReducer,
  deleteBookReducer: DeleteBookReducer,

  borrowBookReducer: BorrowBookReducer,
  returnBookReducer: ReturnBookReducer,
  pendingBooksReducer: PendingBooksReducer,

  profileImageReducer: ProfileImageReducer,
  availableBooksReducer: AvailableBooksReducer,
  getCategoriesReducer: GetCategoriesReducer,
  getUsertypesReducer: GetUsertypesReducer,
  getAccountTypesReducer: GetAccountTypesReducer,
  addCategoryReducer: AddCategoryReducer,
});

export default rootReducer;
