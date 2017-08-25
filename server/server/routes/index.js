import controllers from '../controller'
import userHelper from '../helper/checkuser';
import loginHelper from '../helper/checklogin';

const checkUser = userHelper;
const checkLogin = loginHelper;

const userController = controllers.user;
const bookController = controllers.book;
const borrowLogController = controllers.borrowlog;

//private models to handle model setups
const userTypeController = controllers.usertype;
const accountTypeController = controllers.accounttype;
const bookCategoryController = controllers.bookcategory;

let routes = (app) => {
  
  app.get('/api', (req, res) => res.status(200).send({
    message: 'Welcome to Hello Books library',
  }));

  app.post('/api/v1/users/signup', userController.signup);

  app.post('/api/v1/users/signin', userController.signin);

  // app.post('/api/v1/books/', checkLogin, bookController.addBook);
  
  // app.post('/api/v1/books/', checkLogin, checkUser, bookController.addBook);

  // app.put('/api/v1/books/:bookId', checkLogin, checkUser, bookController.editBook);

  // app.get('/api/v1/books/', checkLogin, bookController.getBooks);

  // app.post('/api/v1/users/:userId/books/', checkLogin, borrowLogController.borrowBook);

  // app.get('/api/v1/users/:userId/books/', checkLogin, borrowLogController.getBorrowedBooks);

  // app.put('/api/v1/users/:userId/books/', checkLogin, borrowLogController.returnBook);


  app.post('/api/v1/books/', bookController.addBook);
  
  app.post('/api/v1/books/', bookController.addBook);

  app.put('/api/v1/books/:bookId', bookController.editBook);

  app.get('/api/v1/books/', bookController.getBooks);

  app.post('/api/v1/users/:userId/books/', borrowLogController.borrowBook);

  app.get('/api/v1/users/:userId/books/', borrowLogController.getBorrowedBooks);

  app.put('/api/v1/users/:userId/books/',  borrowLogController.returnBook);

  app.get('/api/v1/users', userController.getUsers);

  app.get('/api/v1/users/accounttype/:accountTypeId', userController.getUsersByAccountType);

  app.get('/api/v1/users/usertype/:userTypeId', userController.getUsersByUserType);

  app.put('/api/v1/users/:userId/password', userController.editPassword);

  app.put('/api/v1/users/:userId/', userController.editUser);

  app.delete('/api/v1/users/:userId/', userController.deleteUser);

  app.post('/api/v1/category/', bookCategoryController.addCategory);
  
  app.get('/api/v1/category/', bookCategoryController.getCategories);

  app.post('/api/v1/usertype/', userTypeController.addUserType);
  
  app.get('/api/v1/usertype/', userTypeController.getUserTypes);

  app.post('/api/v1/accounttype/', accountTypeController.addAccountType);
  
  app.get('/api/v1/accounttype/', accountTypeController.getAccountTypes);
};

export default routes;