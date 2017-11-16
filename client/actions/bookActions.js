import querystring from 'querystring';
import axios from 'axios';
import {
  ADD_BOOK,
  EDIT_BOOK,
  DELETE_BOOK,
  GET_BOOKS,
  GET_BOOKS_AVAILABLE,
  GET_BOOKS_DELETED,
  GET_BOOKS_FINISHED
} from '../utils/Constants';
import {
  authenticateFetch
} from '../utils/authenticate';
import routes from '../utils/Routes';

const {
  token
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


const editBookSync = bookDetails => ({
  type: EDIT_BOOK,
  bookDetails
});
/**
 *
 *
 * @export
 * @param {any} bookDetails
 * @returns {Object} book object
 */
export function editBook() {
  return (dispatch) => {
    axios
      .put()
      .then((response) => {
        if (response) {
          dispatch(editBookSync(response.data));
        }
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
  const config = {
    headers: {
      'user-token': token
    }
  };
  return (dispatch) => {
    axios
      .get(routes.getBooks, config)
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
 * @export
 * @returns {object} dispatch object
 */
export function getBooksAvailable() {
  const config = {
    headers: {
      'user-token': token
    }
  };
  return (dispatch) => {
    axios
      .get(routes.getBooksAvailable, config)
      .then((response) => {
        if (response.data.success) {
          dispatch(getBooksAvailableSync(response.data));
        }
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
