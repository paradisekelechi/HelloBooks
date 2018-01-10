/**
 *  @fileOverview Account type action file
 *
 *  @author Paradise Kelechi
 *
 * @requires NPM:axios
 * @requires ../helpers/Constants
 * @requires ../../tools/Routes
 * @requires ../helpers/Alert
 *
 */

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
 * @export getAccountTypes
 *
 * @returns {object} dispatch object
 */
export const getAccountTypes = () => {
  return (dispatch) => {
    return axios
      .get(routes.accountType)
      .then((response) => {
        dispatch(getAccountTypesSync(response.data));
      }).catch((error) => {
        Alert('error', error.response.data.message, null);
      });
  };
};
