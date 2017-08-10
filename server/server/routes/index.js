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

  app.post('/api/users/signup', userController.signup);

  app.post('/api/users/signin', userController.signin);

  app.post('/api/books/', checkLogin, bookController.addBook);
  
  app.post('/api/books/', checkLogin, checkUser, bookController.addBook);

  app.put('/api/books/:bookId', checkLogin, checkUser, bookController.editBook);

  app.get('/api/books/', checkLogin, bookController.getBooks);

  app.post('/api/users/:userId/books/', checkLogin, borrowLogController.borrowBook);

  app.get('/api/users/:userId/books/', checkLogin, borrowLogController.getPendingBooks);

  app.put('/api/users/:userId/books/', checkLogin, borrowLogController.returnBook);



  //urls for internal process - book categories, usertype and acccounttype
  app.post('/api/category/', bookCategoryController.addCategory);
  app.get('/api/category/', bookCategoryController.getCategories);

  app.post('/api/usertype/', userTypeController.addUserType);
  app.get('/api/usertype/', userTypeController.getUserTypes);

  app.post('/api/accounttype/', accountTypeController.addAccountType);
  app.get('/api/accounttype/', accountTypeController.getAccountTypes);
};

export default routes;