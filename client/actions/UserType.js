/**
 *  @fileOverview  Usertype action file
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
  GET_USERTYPES
} from '../helpers/Constants';
import routes from '../../tools/Routes';
import Alert from '../helpers/Alert';

export const getUsertypesSync = payload => ({
  type: GET_USERTYPES,
  payload
});

/**
 * Get usertypes action
 *
 * @export getUsertypes
 *
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
