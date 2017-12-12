import axios from 'axios';
import * as actionConstants from '../utils/Constants';
import routes from '../../tools/apiRoutes';
import {
  authenticateFetch
} from '../utils/authenticate';

const {
  token,
  userdata
} = authenticateFetch();

const {
  BORROW_BOOK,
  RETURN_BOOK
} = actionConstants;

export const borrowBookSync = payload => ({
  type: BORROW_BOOK,
  payload
});

/**
 *
 *
 * @export
 * @param {any} bookId
 * @returns {object} dispatch object
 */
export function borrowBook(bookId) {
  const config = {
    headers: {
      'user-token': token
    }
  };
  const formdata = {
    bookId
  };
  const url = `${routes.users}/${userdata.userid}/books`;
  return (dispatch) => {
    return axios
      .post(url, formdata, config)
      .then((response) => {
        response.data.bookId = bookId;
        dispatch(borrowBookSync(response.data));
        return response;
      }).catch((error) => {
        error.data.bookId = bookId;
        dispatch(borrowBookSync(error.data));
      });
  };
}

export const returnBookSync = payload => ({
  type: RETURN_BOOK,
  payload
});

/**
 *
 *
 * @export
 * @param {string} bookId
 * @returns {object} dispatch object
 */
export function returnBook(bookId) {
  const config = {
    headers: {
      'user-token': token
    }
  };
  const formdata = {
    bookId
  };
  const url = `${routes.users}/${userdata.userid}/books`;
  return (dispatch) => {
    return axios
      .put(url, formdata, config)
      .then((response) => {
        response.data.bookId = bookId;
        dispatch(returnBookSync(response.data));
        return response;
      }).catch((error) => {
        error.data.bookId = bookId;
        dispatch(returnBookSync(error.data));
      });
  };
}
