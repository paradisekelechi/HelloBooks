/**
 *  @fileOverview  Book action file
 *
 *  @author Paradise Kelechi
 *
 * @requires NPM:axios
 * @requires NPM:querystring
 * @requires NPM:react-router
 * @requires ../helpers/Constants
 * @requires ../../tools/Routes
 * @requires ../helpers/Alert
 * @requires ../helpers/Authentication'
 *
 */

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

export const addBookSync = payload => ({
  type: ADD_BOOK,
  payload
});

/**
 * Add book action
 *
 * @export addBook
 *
 * @param {String} addBookId
 * @param {Object} bookdata
 *
 * @returns {Object}  dispatch object
 */
export const addBook = (addBookId, bookdata) => {
  const config = {
    headers: {
      'user-token': token
    }
  };
  const url = routes.addBooks;
  return (dispatch) => {
    return axios
      .post(url, bookdata, config)
      .then((response) => {
        dispatch(addBookSync(response.data));
        Alert('success', response.data.message, browserHistory.push('/books'));
      }).catch((error) => {
        Alert('error', error.response.data.message, null);
      });
  };
};


export const editBookSync = payload => ({
  type: EDIT_BOOK,
  payload
});

/**
 * Edit book action
 *
 * @export editBook
 *
 * @param {String} editBookId
 * @param {Object} bookdata
 *
 * @returns {Object}  dispatch object
 */
export const editBook = (editBookId, bookdata) => {
  const config = {
    headers: {
      'user-token': token
    }
  };
  const url = `${routes.getBooks}/${editBookId}`;
  return (dispatch) => {
    return axios
      .put(url, bookdata, config)
      .then((response) => {
        response.data.editBookId = editBookId;
        dispatch(editBookSync(response.data));
        Alert('success', response.data.message, null);
      }).catch((error) => {
        Alert('error', error.response.data.message, null);
      });
  };
};

export const deleteBookSync = payload => ({
  type: DELETE_BOOK,
  payload
});

/**
 * Delete book action
 *
 * @export deleteBook
 *
 * @param {String} bookId
 *
 * @returns {Object}  dispatch object
 */
export const deleteBook = (bookId) => {
  const config = {
    headers: {
      'user-token': token
    }
  };
  const url = `${routes.getBooks}/${bookId}`;
  return (dispatch) => {
    return axios
      .delete(url, config)
      .then((response) => {
        dispatch(deleteBookSync(response.data));
        Alert('success', response.data.message, null);
      }).catch((error) => {
        Alert('error', error.response.data.message, null);
      });
  };
};


export const getSingleBookSync = payload => ({
  type: GET_SINGLE_BOOK,
  payload
});

/**
 * Get single book action
 *
 * @export getSingleBook
 *
 * @param {any} bookId
 *
 * @returns {Object} config object
 */
export const getSingleBook = (bookId) => {
  const config = {
    headers: {
      'user-token': token
    }
  };
  return (dispatch) => {
    return axios
      .get(`${routes.getSingleBook}?id=${bookId}`, config)
      .then((response) => {
        dispatch(getSingleBookSync(response.data));
      });
  };
};


export const getBooksSync = payload => ({
  type: GET_BOOKS,
  payload
});
/**
 * Get books action
 *
 * @export getBooks
 *
 * @param {any} books
 *
 * @returns {object} dispatch object
 */
export const getBooks = () => {
  return (dispatch) => {
    return axios
      .get(routes.getBooks)
      .then((response) => {
        dispatch(getBooksSync(response.data));
      });
  };
};


export const getBooksFinishedSync = payload => ({
  type: GET_BOOKS_FINISHED,
  payload
});
/**
 * Get finished books action
 *
 * @export getBooksFinished
 *
 * @returns {Object} book dispatch
 */
export const getBooksFinished = () => {
  const config = {
    headers: {
      'user-token': token
    }
  };
  return (dispatch) => {
    return axios
      .get(routes.getBooksFinished, config)
      .then((response) => {
        dispatch(getBooksFinishedSync(response.data));
      });
  };
};

export const getBooksAvailableSync = payload => ({
  type: GET_BOOKS_AVAILABLE,
  payload
});

/**
 * Get vailable books action
 *
 * @export getBooksAvailable
 *
 * @param {String} category
 *
 * @returns {object} dispatch object
 */
export const getBooksAvailable = () => {
  const getBooksUrl = routes.getBooksAvailable;
  return (dispatch) => {
    return axios
      .get(getBooksUrl)
      .then((response) => {
        dispatch(getBooksAvailableSync(response.data));
      }).catch((error) => {
        Alert('error', error.response.data.message, null);
      });
  };
};

export const getPendingBooksSync = payload => ({
  type: GET_PENDING_BOOKS,
  payload
});

/**
 * Get pending books action
 *
 * @export getPendingBooks
 *
 * @param {String} category
 *
 * @returns {object} dispatch object
 */
export const getPendingBooks = () => {
  const url = `${routes.users}/${userdata.userid}/books`;
  const config = {
    headers: {
      'user-token': token
    }
  };
  return (dispatch) => {
    return axios
      .get(url, config)
      .then((response) => {
        dispatch(getPendingBooksSync(response.data));
      }).catch((error) => {
        Alert('error', error.response.data.message, null);
      });
  };
};


export const getBooksDeletedSync = payload => ({
  type: GET_BOOKS_DELETED,
  payload
});
/**
 * Get deleted books action
 *
 * @export getBooksDeleted
 *
 * @returns {Object} book dispatch
 */
export const getBooksDeleted = () => {
  const config = {
    headers: {
      'user-token': token
    }
  };
  return (dispatch) => {
    return axios
      .get(routes.getBooksDeleted, config)
      .then((response) => {
        dispatch(getBooksDeletedSync(response.data));
      });
  };
};
