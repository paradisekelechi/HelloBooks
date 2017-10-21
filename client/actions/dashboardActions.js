import axios from 'axios';
import { GET_BOOKS } from '../utils/actionConstants';
import routes from '../utils/apiRoutes';


const getBooksCountSync = data => ({
  type: GET_BOOKS,
  data
});
/**
 * @export
 * @param {any} data
 * @returns {void}
 */
export default getBooksCount(data) {
  const config = {
    headers: {
      'user-token': ''
    }
  };
  return (dispatch) => {
    axios
      .post(routes.getBooksCount, config)
      .then((books) => {
      });
  };
}
