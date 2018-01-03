import axios from 'axios';
import {
  browserHistory
} from 'react-router';
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
} from '../helpers/Constants';
import {
  authenticateFetch
} from '../helpers/Authentication';
import routes from '../../tools/Routes';
import Alert from '../helpers/Alert';

const {
  token,
  userdata
} = authenticateFetch();

const addBookSync = payload => ({
  type: ADD_BOOK,
  payload
});

/**
 *
 *
 * @export
 * @param {String} addBookId
 * @param {Object} bookdata
 * @returns {Object}  dispatch object
 */
export function addBook(addBookId, bookdata) {
  const config = {
    headers: {
      'user-token': token
    }
  };
  const url = routes.addBooks;
  return (dispatch) => {
    axios
      .post(url, bookdata, config)
      .then((response) => {
        dispatch(addBookSync(response.data));
        Alert('success', response.data.message, browserHistory.push('/books'));
      }).catch((error) => {
        Alert('error', error.response.data.message, null);
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
        Alert('success', response.data.message, null);
      }).catch((error) => {
        Alert('error', error.response.data.message, null);
      });
  };
}

const deleteBookSync = payload => ({
  type: DELETE_BOOK,
  payload
});

/**
 *
 *
 * @export
 * @param {String} bookId
 * @returns {Object}  dispatch object
 */
export function deleteBook(bookId) {
  const config = {
    headers: {
      'user-token': token
    }
  };
  const url = `${routes.getBooks}/${bookId}`;
  return (dispatch) => {
    axios
      .delete(url, config)
      .then((response) => {
        dispatch(deleteBookSync(response.data));
        Alert('success', response.data.message, window.location.reload());
      }).catch((error) => {
        Alert('error', error.response.data.message, null);
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
export function getBooksAvailable() {
  const getBooksUrl = routes.getBooksAvailable;
  return (dispatch) => {
    axios
      .get(getBooksUrl)
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
