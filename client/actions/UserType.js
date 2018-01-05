import axios from 'axios';
import {
  GET_USERTYPES
} from '../helpers/Constants';
import routes from '../../tools/Routes';
import Alert from '../helpers/Alert';

export const getUsertypesSync = payload => ({
  type: GET_USERTYPES,
  payload
});

/**
 * @export
 * @returns {object} dispatch object
 */
export const getUsertypes = () => {
  return (dispatch) => {
    axios
      .get(routes.userType)
      .then((response) => {
        dispatch(getUsertypesSync(response.data));
      }).catch((error) => {
        Alert('error', error.response.data.message, null);
      });
  };
};
