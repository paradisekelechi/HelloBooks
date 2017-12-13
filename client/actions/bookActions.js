import querystring from 'querystring';
import axios from 'axios';
import {
  ADD_BOOK,
  EDIT_BOOK,
  DELETE_BOOK,
  GET_BOOKS,
  GET_BOOKS_AVAILABLE,
  GET_BOOKS_DELETED,
  GET_BOOKS_FINISHED,
  GET_PENDING_BOOKS,
  GET_SINGLE_BOOK
} from '../utils/Constants';
import {
  authenticateFetch
} from '../utils/authenticate';
import routes from '../../tools/apiRoutes';

const {
  token,
  userdata
} = authenticateFetch();


const addBookSync = bookDetails => ({
  type: ADD_BOOK,
  bookDetails
});
/**
 * @export
 * @param {any} bookDetails
 * @returns {object} addBook object and dispatch
 */
export function addBook(bookDetails) {
  const postData = querystring.stringify({
    name: bookDetails.name,
    author: bookDetails.author,
    category: bookDetails.category
  });
  const config = {
    headers: {
      'user-token': token
    }
  };
  return (dispatch) => {
    axios
      .post(routes.addBooks, postData, config)
      .then((response) => {
        if (response) {
          dispatch(addBookSync(response.data));
        }
      });
  };
}


const editBookSync = payload => ({
  type: EDIT_BOOK,
  payload
});

/**
 *
 *
 * @export
 * @param {String} editBookId
 * @param {Object} bookdata
 * @returns {Object}  dispatch object
 */
export function editBook(editBookId, bookdata) {
  const config = {
    headers: {
      'user-token': token
    }
  };
  const url = `${routes.getBooks}/${editBookId}`;
  return (dispatch) => {
    axios
      .put(url, bookdata, config)
      .then((response) => {
        response.data.editBookId = editBookId;
        dispatch(editBookSync(response.data));
      });
  };
}


const deleteBookSync = () => ({
  type: DELETE_BOOK
});
/**
 *
 *
 * @export
 * @returns {object} delete response object
 */
export function deleteBook() {
  const config = {
    headers: {
      'user-token': token
    }
  };
  return (dispatch) => {
    axios
      .delete(config)
      .then((response) => {
        if (response) {
          dispatch(deleteBookSync());
        }
      });
  };
}

const getSingleBookSync = payload => ({
  type: GET_SINGLE_BOOK,
  payload
});

/**
 *
 *
 * @export
 * @param {any} bookId
 * @returns {Object} config object
 */
export function getSingleBook(bookId) {
  const config = {
    headers: {
      'user-token': token
    }
  };
  return (dispatch) => {
    axios
      .get(`${routes.getSingleBook}?id=${bookId}`, config)
      .then((response) => {
        if (response.data.success) {
          dispatch(getSingleBookSync(response.data));
        }
      });
  };
}


const getBooksSync = payload => ({
  type: GET_BOOKS,
  payload
});
/**
 *
 *
 * @export
 * @param {any} books
 * @returns {object} dispatch object
 */
export function getBooks() {
  return (dispatch) => {
    axios
      .get(routes.getBooks)
      .then((response) => {
        if (response.data.success) {
          dispatch(getBooksSync(response.data));
        }
      });
  };
}


const getBooksFinishedSync = payload => ({
  type: GET_BOOKS_FINISHED,
  payload
});
/**
 *
 *
 * @export
 * @returns {type} book dispatch
 */
export function getBooksFinished() {
  const config = {
    headers: {
      'user-token': token
    }
  };
  return (dispatch) => {
    axios
      .get(routes.getBooksFinished, config)
      .then((response) => {
        if (response.data.success) {
          dispatch(getBooksFinishedSync(response.data));
        }
      });
  };
}

const getBooksAvailableSync = payload => ({
  type: GET_BOOKS_AVAILABLE,
  payload
});

/**
 *
 *
 * @export
 * @param {String} category
 * @returns {object} dispatch object
 */
export function getBooksAvailable(category) {
  const getBooksUrl = routes.getBooksAvailable;
  const url = `${getBooksUrl}&category=${category}`;
  return (dispatch) => {
    axios
      .get(url)
      .then((response) => {
        if (response.data.success) {
          dispatch(getBooksAvailableSync(response.data));
        }
      });
  };
}

const getPendingBooksSync = payload => ({
  type: GET_PENDING_BOOKS,
  payload
});

/**
 *
 *
 * @export
 * @param {String} category
 * @returns {object} dispatch object
 */
export function getPendingBooks() {
  const url = `${routes.users}/${userdata.userid}/books`;
  const config = {
    headers: {
      'user-token': token
    }
  };
  return (dispatch) => {
    axios
      .get(url, config)
      .then((response) => {
        if (response.data.success) {
          dispatch(getPendingBooksSync(response.data));
        }
      }).catch((error) => {
        dispatch(getPendingBooksSync(error.data));
      });
  };
}


const getBooksDeletedSync = payload => ({
  type: GET_BOOKS_DELETED,
  payload
});
/**
 *
 *
 * @export
 * @returns {type} book dispatch
 */
export function getBooksDeleted() {
  const config = {
    headers: {
      'user-token': token
    }
  };
  return (dispatch) => {
    axios
      .get(routes.getBooksDeleted, config)
      .then((response) => {
        if (response.data.success) {
          dispatch(getBooksDeletedSync(response.data));
        }
      });
  };
}
