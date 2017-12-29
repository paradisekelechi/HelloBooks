import axios from 'axios';
import {
  GET_BOOK_CATEGORIES
} from '../helpers/Constants';
import routes from '../../tools/Routes';

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
        if (response.data.success) {
          dispatch(getCategoriesSync(response.data));
        }
      });
  };
};
