import axios from 'axios';
import * as categoryActions from '../utils/Constants';
import routes from '../../tools/apiRoutes';

const {
  GET_BOOK_CATEGORIES
} = categoryActions;

export const getCategoriesSync = payload => ({
  type: GET_BOOK_CATEGORIES,
  payload
});

/**
 * @export
 * @returns {object} dispatch object
 */
export function getCategories() {
  return (dispatch) => {
    axios
      .get(routes.bookCategory)
      .then((response) => {
        if (response.data.success) {
          dispatch(getCategoriesSync(response.data));
        }
      });
  };
}
