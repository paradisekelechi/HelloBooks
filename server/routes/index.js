import controllers from '../controller';
import userHelper from '../helper/checkuser';
import loginHelper from '../helper/checklogin';

const checkUser = userHelper;
const checkLogin = loginHelper;

const userController = controllers.user;
const bookController = controllers.book;
const borrowLogController = controllers.borrowlog;

// private models to handle model setups
const userTypeController = controllers.usertype;
const accountTypeController = controllers.accounttype;
const bookCategoryController = controllers.bookcategory;

const routes = (app) => {
  /**
   * @swagger
   * definition:
   *   Authentication:
   *     properties:
   *       message:
   *         type: string
   *       token:
   *         type: string
   *       success:
   *         type: boolean
   *       email:
   *         type: string
   *       username:
   *         type: string
   *       usertype:
   *         type: integer
   *       accounttype:
   *         type: integer
   */

  /**
   * @swagger
   * definition:
   *   General:
   *     properties:
   *       message:
   *         type: string
   *       success:
   *         type: boolean
   */

  /**
   * @swagger
   * definition:
   *   Books:
   *     properties:
   *       message:
   *         type: string
   *       success:
   *         type: boolean
   *       books:
   *         type: object
   */

  /**
   * @swagger
   * /api/v1/users/signup:
   *   post:
   *     tags:
   *       - Signup
   *     description: Signs up a user
   *     produces:
   *       - application/json
   *     responses:
   *       200:
   *         description: An object of response messages and status
   *         schema:
   *           $ref: '#/definitions/Authentication'
   */
  app.post('/api/v1/users/signup', userController.signup);

  /**
   * @swagger
   * /api/v1/users/signin:
   *   post:
   *     tags:
   *       - Signin
   *     description: Signs in a user
   *     produces:
   *       - application/json
   *     responses:
   *       200:
   *         description: An object of response messages and status
   *         schema:
   *           $ref: '#/definitions/Authentication'
   */
  app.post('/api/v1/users/signin', userController.signin);

  /**
   * @swagger
   * /api/v1/books:
   *   post:
   *     tags:
   *       - Add Book
   *     description: Add a book
   *     produces:
   *       - application/json
   *     responses:
   *       200:
   *         description: An object of response messages and status
   *         schema:
   *           $ref: '#/definitions/Books'
   */
  app.post('/api/v1/books/', checkLogin, checkUser, bookController.addBook);

  /**
   * @swagger
   * /api/v1/books/:bookId:
   *   put:
   *     tags:
   *       - Edit Book
   *     description: Edit a book
   *     produces:
   *       - application/json
   *     responses:
   *       200:
   *         description: An object of response messages and status
   *         schema:
   *           $ref: '#/definitions/Books'
   */
  app.put('/api/v1/books/:bookId', checkLogin, checkUser, bookController.editBook);

  /**
   * @swagger
   * /api/v1/books:
   *   get:
   *     tags:
   *       - Get Books
   *     description: Get all book
   *     produces:
   *       - application/json
   *     responses:
   *       200:
   *         description: An object of response messages, status and books
   *         schema:
   *           $ref: '#/definitions/Books'
   */
  app.get('/api/v1/books/', checkLogin, bookController.getBooks);
  app.get('/api/v1/books/finished', checkLogin, bookController.getFinishedBooks);
  app.get('/api/v1/books/deleted', checkLogin, bookController.getDeletedBooks);
  app.get('/api/v1/books/available', checkLogin, bookController.getAvailableBooks);
  app.post('/api/v1/users/:userId/books/', checkLogin, borrowLogController.borrowBook);
  app.get('/api/v1/users/:userId/books/', checkLogin, borrowLogController.getBorrowedBooks);
  app.put('/api/v1/users/:userId/books/', checkLogin, borrowLogController.returnBook);
  app.get('/api/v1/users', checkLogin, checkUser, userController.getUsers);
  app.get('/api/v1/users/admin', checkLogin, checkUser, userController.getAdminUsers);
  app.get('/api/v1/users/client', checkLogin, checkUser, userController.getClientUsers);
  app.get('/api/v1/users/deleted', checkLogin, checkUser, userController.getDeletedUsers);

  app.get('/api/v1/users/accounttype/:accountTypeId', checkLogin, checkUser, userController.getUsersByAccountType);
  app.get('/api/v1/users/usertype/:userTypeId', checkLogin, checkUser, userController.getUsersByUserType);
  app.put('/api/v1/users/:userId/', checkLogin, userController.editUser);
  app.put('/api/v1/users/delete/:userId/', checkLogin, checkUser, userController.deleteUser);

  app.post('/api/v1/category/', checkLogin, checkUser, bookCategoryController.addCategory);
  app.get('/api/v1/category/', checkLogin, checkUser, bookCategoryController.getCategories);

  app.post('/api/v1/usertype/', checkLogin, checkUser, userTypeController.addUserType);
  app.get('/api/v1/usertype/', checkLogin, checkUser, userTypeController.getUserTypes);

  app.post('/api/v1/accounttype/', checkLogin, checkUser, accountTypeController.addAccountType);
  app.get('/api/v1/accounttype/', checkLogin, checkUser, accountTypeController.getAccountTypes);
};

export default routes;
