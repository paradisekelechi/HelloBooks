const baseRoute = '/api/v1/';
const signin = `${baseRoute}users/signin`;
const signup = `${baseRoute}users/signup`;
const getBooks = `${baseRoute}books`;
const getBooksFinished = `${baseRoute}books/finished`;
const getBooksDeleted = `${baseRoute}books/deleted`;
const getBooksAvailable = `${baseRoute}books/available`;
const addBooks = `${baseRoute}books`;

const getAllUsers = `${baseRoute}users`;
const getAdminUsers = `${baseRoute}users/admin`;
const getClientUsers = `${baseRoute}users/client`;
const getDeletedUsers = `${baseRoute}users/deleted`;

const editUser = `${baseRoute}users`;
const deleteUser = `${baseRoute}users/delete`;

const routes = {
  signup,
  signin,
  editUser,
  deleteUser,
  addBooks,
  getBooks,
  getBooksFinished,
  getBooksDeleted,
  getBooksAvailable,
  getAllUsers,
  getAdminUsers,
  getClientUsers,
  getDeletedUsers
};

export default routes;
