/**
 *  @fileOverview  Book Category action file
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
  GET_BOOK_CATEGORIES,
  ADD_CATEGORY
} from '../helpers/Constants';
import routes from '../../tools/Routes';
import Alert from '../helpers/Alert';
import {
  authenticateFetch
} from '../helpers/Authentication';

const {
  token
} = authenticateFetch();

export const getCategoriesSync = payload => ({
  type: GET_BOOK_CATEGORIES,
  payload
});

/**
 * Get book categories action
 *
 * @export getCategories
 *
 * @returns {object} dispatch object
 */
export const getCategories = () => {
  return (dispatch) => {
    axios
      .get(routes.bookCategory)
      .then((response) => {
        dispatch(getCategoriesSync(response.data));
      }).catch((error) => {
        Alert('error', error.response.data.message, null);
      });
  };
};

export const addCategorySync = payload => ({
  type: ADD_CATEGORY,
  payload
});

/**
 * Add book category action
 *
 * @export addCategory
 *
 * @param {Object} formdata
 *
 * @returns {Object} dispatch object
 */
export const addCategory = (formdata) => {
  const config = {
    headers: {
      'user-token': token
    }
  };
  const url = routes.bookCategory;
  return (dispatch) => {
    axios
      .post(url, formdata, config)
      .then((response) => {
        dispatch(addCategorySync(response.data));
        Alert('success', response.data.message, null);
      }).catch((error) => {
        Alert('error', error.response.data.message, null);
      });
  };
};
