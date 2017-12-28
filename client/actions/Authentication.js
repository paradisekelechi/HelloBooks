import axios from 'axios';
import querystring from 'querystring';
import {
  browserHistory
} from 'react-router';
import swal from 'sweetalert2';

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
        const {
          data
        } = error.response;
        swal({
          showConfirmButton: false,
          type: 'error',
          title: 'User Signin',
          text: data.message,
          timer: 2000,
        });
        Materialize.toast(data.message, 3000, `${data.success ? 'blue' : 'red'}`);
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

    return request.then((response) => {
      if (response.data.success) {
        authenticatePersist(response.data.token);
        dispatch(signupUserAsync(response.data));
        browserHistory.push('/books');
        window.location.reload();
      }
    }).catch((error) => {
      const {
        data
      } = error.response;
      Materialize.toast(data.message, 3000, `${data.success ? 'blue' : 'red'} rounded`);
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
    window.location.reload();
  };
};
