import controllers from '../controller'
const userController = controllers.user;
const bookController = controllers.book;
const borrowLogController = controllers.borrowlog;

let routes = (app) => {
  
  app.get('/api', (req, res) => res.status(200).send({
    message: 'Welcome to Hello Books library',
  }));

  app.post('/api/users/signup', userController.signup);

  app.post('/api/users/signin', userController.signin);

  app.post('/api/books/', bookController.addBook);

  app.put('/api/books/', bookController.editBook);

  app.get('/api/books/', bookController.getBooks);

  app.post('/api/users/:userId/books/', borrowLogController.borrowBook);

  app.get('/api/users/:userId/books/', borrowLogController.getPendingBooks);

  app.put('/api/users/:userId/books/', borrowLogController.returnBook);

};

export default routes;