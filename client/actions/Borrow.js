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
    axios
      .post(url, formdata, config)
      .then((response) => {
        response.data.bookId = bookId;
        dispatch(borrowBookSync(response.data));
        Alert('success', response.data.message, window.location.reload());
      }).catch((error) => {
        Alert('error', error.response.data.message, null);
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
        Alert('success', response.data.message, window.location.reload());
      }).catch((error) => {
        Alert('error', error.response.data.message, null);
      });
  };
};
