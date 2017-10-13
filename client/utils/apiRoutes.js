const baseRoute = 'http://localhost:5000/api/v1/';
const signin = `${baseRoute}users/signin`;
const signup = `${baseRoute}users/signup`;
const getBooks =`${baseRoute}books`;
const getBooksBorrowed = `${baseRoute}books`;
const getBooksUnreturned = `${baseRoute}books`;
const addBooks = `${baseRoute}books`;

const routes = {
    signup,
    signin,
    getBooks,
    addBooks
}

export default routes;