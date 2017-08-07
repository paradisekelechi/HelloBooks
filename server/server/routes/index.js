import controllers from '../controller'
const userController = controllers.user;
const bookController = controllers.book;

let routes = (app) => {
  
  app.get('/api', (req, res) => res.status(200).send({
    message: 'Welcome to Hello Books library',
  }));

  app.post('/api/users/signup', userController.signup);

  app.post('/api/users/signin', userController.signin);

  app.post('/api/books/', bookController.addBook);

  app.get('/api/books/', bookController.getAllBooks);
};

export default routes;