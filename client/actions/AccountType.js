import axios from 'axios';
import {
  GET_ACCOUNTTYPES
} from '../helpers/Constants';
import routes from '../../tools/Routes';
import Alert from '../helpers/Alert';

export const getAccountTypesSync = payload => ({
  type: GET_ACCOUNTTYPES,
  payload
});

/**
 * @export
 * @returns {object} dispatch object
 */
export const getAccountTypes = () => {
  return (dispatch) => {
    axios
      .get(routes.accountType)
      .then((response) => {
        dispatch(getAccountTypesSync(response.data));
      }).catch((error) => {
        Alert('error', error.response.data.message, null);
      });
  };
};
