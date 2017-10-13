const baseRoute = 'http://localhost:5000/api/v1/';
const signin = `${baseRoute}users/signin`;
const signup = `${baseRoute}users/signup`;
const getBooks =`${baseRoute}books`;
const getBooksFinished = `${baseRoute}books/finished`;
const getBooksDeleted = `${baseRoute}books/deleted`;
const getBooksAvailable = `${baseRoute}books/available`;
const addBooks = `${baseRoute}books`;

const routes = {
    signup,
    signin,
    addBooks,
    getBooks,
    getBooksFinished,
    getBooksDeleted,
    getBooksAvailable
}

export default routes;