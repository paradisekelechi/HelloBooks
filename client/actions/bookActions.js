import swal from 'sweetalert2';
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
        response.data.editBookId = addBookId;
        dispatch(addBookSync(response.data));
      }).catch((error) => {
        const {
          data
        } = error.response;
        Materialize.toast(data.message, 3000, `${data.success ? 'blue' : 'red'} rounded`);
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
        swal(
          'Edit Book!',
          response.data.message,
          response.data.success ? 'success' : 'error'
        );
        Materialize.toast(
          response.data.message,
          5000,
          `${response.data.success ? 'blue' : 'red'} rounded`
        );
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
        Materialize.toast(
          response.data.message,
          5000,
          `${response.data.success ? 'blue' : 'red'} rounded`
        );
        swal(
          'Delete Book!',
          response.data.message,
          response.data.success ? 'success' : 'error'
        ).then(() => {
          window.location.reload();
        });
      }).catch((error) => {
        const {
          data
        } = error.response;
        Materialize.toast(data.message, 3000, `${data.success ? 'blue' : 'red'} rounded`);
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
