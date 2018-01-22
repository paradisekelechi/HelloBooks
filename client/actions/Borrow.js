/**
 *  @fileOverview  Borrow action file
 *
 *  @author Paradise Kelechi
 *
 * @requires NPM:axios
 * @requires ../helpers/Constants
 * @requires ../../tools/Routes
 * @requires ../helpers/Alert
 * @requires ../helpers/Authentication'
 *
 */

import axios from 'axios';
import {
  BORROW_BOOK,
  RETURN_BOOK
} from '../helpers/Constants';
import routes from '../../tools/Routes';
import {
  authenticateFetch
} from '../helpers/Authentication';
import Alert from '../helpers/Alert';

const {
  token,
  userdata
} = authenticateFetch();

export const borrowBookSync = payload => ({
  type: BORROW_BOOK,
  payload
});

/**
 * Borrow book action
 *
 * @export borrowBook
 *
 * @param {any} bookId
 *
 * @returns {object} dispatch object
 */
export const borrowBook = (bookId) => {
  const config = {
    headers: {
      'user-token': token
    }
  };
  const formdata = {
    bookId
  };
  const userId = userdata.userid;
  const url = (`${routes.users}/${userId}/books`);
  return (dispatch) => {
    return axios
      .post(url, formdata, config)
      .then((response) => {
        response.data.bookId = bookId;
        dispatch(borrowBookSync(response.data));
        Alert('success', response.data.message, null);
      }).catch((error) => {
        Alert('error', error.response.data.message, null);
      });
  };
};

export const returnBookSync = payload => ({
  type: RETURN_BOOK,
  payload
});

/**
 * Return book action
 *
 * @export returnBook
 *
 * @param {string} bookId
 *
 * @returns {object} dispatch object
 */
export const returnBook = (bookId) => {
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
    axios
      .put(url, formdata, config)
      .then((response) => {
        response.data.bookId = bookId;
        dispatch(returnBookSync(response.data));
        Alert('success', response.data.message, null);
      }).catch((error) => {
        Alert('error', error.response.data.message, null);
      });
  };
};
