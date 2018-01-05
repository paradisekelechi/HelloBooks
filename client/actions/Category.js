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

const getCategoriesSync = payload => ({
  type: GET_BOOK_CATEGORIES,
  payload
});

/**
 * @export
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

const addCategorySync = payload => ({
  type: ADD_CATEGORY,
  payload
});

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
