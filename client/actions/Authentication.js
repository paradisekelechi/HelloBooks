import axios from 'axios';
import querystring from 'querystring';
import {
  browserHistory
} from 'react-router';
import {
  SIGNIN_USER,
  SIGNUP_USER,
  LOGOUT_USER,
} from '../helpers/Constants';
import routes from '../../tools/Routes';
import {
  authenticatePersist,
  authenticateClear
} from '../helpers/Authentication';
import Alert from '../helpers/Alert';


const signinUserAsync = data => ({
  type: SIGNIN_USER,
  payload: data
});
/**
 * @export
 * @param {any} user
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


const signupUserAsync = user => ({
  type: SIGNUP_USER,
  payload: user
});
/**
 *
 *
 * @export
 * @param {any} user
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


const logoutUserAsync = user => ({
  type: LOGOUT_USER,
  user
});
/**
 *
 *
 * @export
 * @param {any} user
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
