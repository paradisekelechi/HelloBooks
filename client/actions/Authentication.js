/**
 *  @fileOverview  Authentication (Signin and signup) action file
 *
 *  @author Paradise Kelechi
 *
 * @requires NPM:axios
 * @requires NPM:querystring
 * @requires NPM:react-router
 * @requires ../helpers/Constants
 * @requires ../../tools/Routes
 * @requires ../helpers/Alert
 * @requires ../helpers/Authentication'
 *
 */

import axios from 'axios';
import querystring from 'querystring';
import {
  browserHistory
} from 'react-router';
import {
  SIGNIN_USER,
  GOOGLE_SIGNIN_USER,
  SIGNUP_USER,
  LOGOUT_USER,
} from '../helpers/Constants';
import routes from '../../tools/Routes';
import {
  authenticatePersist,
  authenticateClear
} from '../helpers/Authentication';
import Alert from '../helpers/Alert';


export const signinUserAsync = data => ({
  type: SIGNIN_USER,
  payload: data
});
/**
 *
 * Signin user action
 *
 * @export signinUser
 *
 * @param {Object} user
 *
 * @returns {void}
 */
export const signinUser = (user) => {
  const formdata = querystring.stringify({
    username: user.username,
    password: user.password
  });
  return (dispatch) => {
    axios.post(`${routes.signin}`, formdata)
      .then((response) => {
        const responseData = response.data;
        authenticatePersist(responseData.token);
        dispatch(signinUserAsync(responseData));
        browserHistory.push('/books');
        window.location.reload();
      }).catch((error) => {
        Alert('error', error.response.data.message, null);
      });
  };
};


export const signupUserAsync = user => ({
  type: SIGNUP_USER,
  payload: user
});
/**
 * Signup user action
 *
 * @export signupUser
 * @param {object} user
 * @returns {void}
 */
export const signupUser = (user) => {
  const formdata = querystring.stringify({
    username: user.username,
    password: user.password,
    email: user.email
  });
  return (dispatch) => {
    const request = axios
      .post(`${routes.signup}`, formdata);

    return request
      .then((response) => {
        authenticatePersist(response.data.token);
        dispatch(signupUserAsync(response.data));
        browserHistory.push('/books');
        Alert('success', response.data.message, window.location.reload());
      }).catch((error) => {
        Alert('error', error.response.data.message, null);
      });
  };
};

export const googleSigninUserAsync = payload => ({
  type: GOOGLE_SIGNIN_USER,
  payload
});
/**
 * Google signin user action
 *
 * @export googleSigninUser
 *
 * @param {Object} user
 *
 * @returns {void}
 */
export const googleSigninUser = (user) => {
  const formdata = querystring.stringify({
    username: user.username,
    password: user.password,
    email: user.email
  });
  return (dispatch) => {
    const request = axios
      .post(`${routes.googleSignin}`, formdata);

    return request
      .then((response) => {
        authenticatePersist(response.data.token);
        dispatch(googleSigninUserAsync(response.data));
        browserHistory.push('/books');
        Alert('success', response.data.message, window.location.reload());
      }).catch((error) => {
        Alert('error', error.response.data.message, null);
      });
  };
};


export const logoutUserAsync = user => ({
  type: LOGOUT_USER,
  user
});
/**
 * Logout user action
 *
 * @export logoutUser
 *
 * @param {Object} user
 *
 * @returns {Object} logout dispatch
 */
export const logoutUser = (user) => {
  return (dispatch) => {
    authenticateClear();
    dispatch(logoutUserAsync(user));
    browserHistory.push('/signin');
    Alert('success', 'User successfully signed out', window.location.reload());
  };
};
