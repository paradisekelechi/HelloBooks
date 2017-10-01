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
const emailController = controllers.email;

let routes = (app) => {
  

  app.post('/api/v1/users/signup', userController.signup);

  app.post('/api/v1/users/signin', userController.signin);

  app.post('/api/v1/books/', checkLogin, checkUser, bookController.addBook);

  app.put('/api/v1/books/:bookId', checkLogin, checkUser, bookController.editBook);

  app.get('/api/v1/books/', checkLogin, bookController.getBooks);

   app.post('/api/v1/users/:userId/books/', checkLogin, borrowLogController.borrowBook);

   app.get('/api/v1/users/:userId/books/', checkLogin, borrowLogController.getBorrowedBooks);

   app.put('/api/v1/users/:userId/books/', checkLogin, borrowLogController.returnBook);


  //app.post('/api/v1/books/', bookController.addBook);

  //app.put('/api/v1/books/:bookId', bookController.editBook);

  //app.get('/api/v1/books/', bookController.getBooks);

  //app.get('/api/v1/books/category/:categoryId', bookController.getBooks);

  //app.post('/api/v1/users/:userId/books/', borrowLogController.borrowBook);

  //app.get('/api/v1/users/:userId/books/', borrowLogController.getBorrowedBooks);

  //app.put('/api/v1/users/:userId/books/',  borrowLogController.returnBook);

  app.get('/api/v1/users', checkLogin, checkUser, userController.getUsers);

  app.get('/api/v1/users/accounttype/:accountTypeId', checkLogin, checkUser, userController.getUsersByAccountType);

  app.get('/api/v1/users/usertype/:userTypeId', checkLogin, checkUser, userController.getUsersByUserType);

  app.put('/api/v1/users/:userId/password', checkLogin, userController.editPassword);

  app.put('/api/v1/users/:userId/', checkLogin, userController.editUser);

  app.delete('/api/v1/users/:userId/', checkLogin, checkUser, userController.deleteUser);

  app.post('/api/v1/category/', checkLogin, checkUser, bookCategoryController.addCategory);
  
  app.get('/api/v1/category/', checkLogin, checkUser, bookCategoryController.getCategories);

  app.post('/api/v1/usertype/', checkLogin, checkUser, userTypeController.addUserType);
  
  app.get('/api/v1/usertype/', checkLogin, checkUser, userTypeController.getUserTypes);

  app.post('/api/v1/accounttype/', checkLogin, checkUser, accountTypeController.addAccountType);
  
  app.get('/api/v1/accounttype/', checkLogin, checkUser, accountTypeController.getAccountTypes);
  
};

export default routes;