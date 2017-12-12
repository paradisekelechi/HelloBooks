import controllers from '../controller';
import userHelper from '../helper/checkuser';
import loginHelper from '../helper/checklogin';

const checkUser = userHelper;
const checkLogin = loginHelper;

const {
  user: userController,
  book: bookController,
  borrowlog: borrowLogController,
  usertype: userTypeController,
  accounttype: accountTypeController,
  bookcategory: bookCategoryController
} = controllers;

const routes = (app) => {
  app.post('/api/v1/users/signup', userController.signup);
  app.post('/api/v1/users/signin', userController.signin);
  app.post('/api/v1/books/', checkLogin, checkUser, bookController.addBook);
  app.get('/api/v1/books/', bookController.getBooks);
  app.get('/api/v1/book', checkLogin, checkUser, bookController.getSingleBook);
  app.put('/api/v1/books/:bookId', bookController.editBook);
  app.post('/api/v1/users/:userId/books/', checkLogin, borrowLogController.borrowBook);
  app.get('/api/v1/users/:userId/books/', checkLogin, borrowLogController.getBorrowedBooks);
  app.put('/api/v1/users/:userId/books/', checkLogin, borrowLogController.returnBook);
  app.get('/api/v1/users', checkLogin, checkUser, userController.getUsers);

  app.put('/api/v1/users/:userId/', checkLogin, userController.editUser);
  app.put('/api/v1/users/delete/:userId/', checkLogin, checkUser, userController.deleteUser);

  app.post('/api/v1/categories/', checkLogin, checkUser, bookCategoryController.addCategory);
  app.get('/api/v1/categories/', bookCategoryController.getCategories);

  app.post('/api/v1/usertypes/', checkLogin, checkUser, userTypeController.addUserType);
  app.get('/api/v1/usertypes/', userTypeController.getUserTypes);

  app.post('/api/v1/accounttypes/', checkLogin, checkUser, accountTypeController.addAccountType);
  app.get('/api/v1/accounttypes/', accountTypeController.getAccountTypes);
};

export default routes;
