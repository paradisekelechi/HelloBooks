import axios from 'axios';
import {
  GET_BOOK_CATEGORIES
} from '../helpers/Constants';
import routes from '../../tools/Routes';
import Alert from '../helpers/Alert';

export const getCategoriesSync = payload => ({
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
