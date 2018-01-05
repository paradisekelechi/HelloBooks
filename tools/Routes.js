const baseRoute = '/api/v1/';
const users = `${baseRoute}users`;
const signin = `${baseRoute}users/signin`;
const signup = `${baseRoute}users/signup`;
const googleSignin = `${baseRoute}users/signin/google`;
const getBooks = `${baseRoute}books`;
const getSingleBook = `${baseRoute}book`;
const getBooksFinished = `${baseRoute}books?finished=true`;
const getBooksDeleted = `${baseRoute}books?deleted=true`;
const getBooksAvailable = `${baseRoute}books?available=true`;
const addBooks = `${baseRoute}books`;

const getAllUsers = `${baseRoute}users`;
const getAdminUsers = `${baseRoute}users?admin=true`;
const getClientUsers = `${baseRoute}users?client=true`;
const getDeletedUsers = `${baseRoute}users?deleted=true`;

const editUser = `${baseRoute}users`;
const deleteUser = `${baseRoute}users/delete`;

const bookCategory = `${baseRoute}categories`;
const userType = `${baseRoute}usertypes`;
const accountType = `${baseRoute}accounttypes`;


const routes = {
  accountType,
  userType,
  bookCategory,
  users,
  signup,
  signin,
  googleSignin,
  editUser,
  deleteUser,
  addBooks,
  getBooks,
  getSingleBook,
  getBooksFinished,
  getBooksDeleted,
  getBooksAvailable,
  getAllUsers,
  getAdminUsers,
  getClientUsers,
  getDeletedUsers
};

export default routes;
