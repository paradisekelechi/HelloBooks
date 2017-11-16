import axios from 'axios';
import querystring from 'querystring';
import {
  browserHistory
} from 'react-router';

import * as userActions from '../utils/Constants';
import routes from '../utils/Routes';
import {
  authenticateFetch,
  authenticatePersist,
  authenticateClear
} from '../utils/Authenticate';

const {
  SIGNIN_USER,
  SIGNUP_USER,
  LOGOUT_USER,
  EDIT_USER_PROFILE
} = userActions;

const {
  token,
  userdata
} = authenticateFetch();

const signinUserAsync = data => ({
  type: SIGNIN_USER,
  payload: data
});
/**
 * @export
 * @param {any} user
 * @returns {void}
 */
export function signinUser(user) {
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
        browserHistory.push('/dashboard');
      });
  };
}


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
export function signupUser(user) {
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
        browserHistory.push('/dashboard');
      }
    }).catch(() => {
      browserHistory.push('/');
    });
  };
}


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
export function logoutUser(user) {
  return (dispatch) => {
    authenticateClear();
    dispatch(logoutUserAsync(user));
    browserHistory.push('/signin');
  };
}

const getAllUsersSync = payload => ({
  type: userActions.GET_ALL_USERS,
  payload
});
/**
 * @export
 * @returns {object} dispatch object
 */
export function getAllUsers() {
  const config = {
    headers: {
      'user-token': token
    }
  };
  console.log(token);
  return (dispatch) => {
    axios
      .get(routes.getAllUsers, config)
      .then((response) => {
        if (response.data.success) {
          dispatch(getAllUsersSync(response.data));
        }
      });
  };
}


const getAdminUsersSync = payload => ({
  type: userActions.GET_ADMIN_USERS,
  payload
});
/**
 * @export
 * @returns {object} dispatch object
 */
export function getAdminUsers() {
  const config = {
    headers: {
      'user-token': token
    }
  };
  return (dispatch) => {
    axios
      .get(routes.getAdminUsers, config)
      .then((response) => {
        if (response.data.success) {
          dispatch(getAdminUsersSync(response.data));
        }
      });
  };
}


const getClientUsersSync = payload => ({
  type: userActions.GET_CLIENT_USERS,
  payload
});
/**
 * @export
 * @returns {object} dispatch object
 */
export function getClientUsers() {
  const config = {
    headers: {
      'user-token': token
    }
  };
  return (dispatch) => {
    axios
      .get(routes.getClientUsers, config)
      .then((response) => {
        if (response.data.success) {
          dispatch(getClientUsersSync(response.data));
        }
      });
  };
}


const getDeletedUsersSync = payload => ({
  type: userActions.GET_DELETED_USERS,
  payload
});
/**
 * @export
 * @returns {object} dispatch object
 */
export function getDeletedUsers() {
  const config = {
    headers: {
      'user-token': token
    }
  };
  return (dispatch) => {
    axios
      .get(routes.getDeletedUsers, config)
      .then((response) => {
        if (response.data.success) {
          dispatch(getDeletedUsersSync(response.data));
        }
      });
  };
}

const editUserProfileImageSync = (data) => {
  return {
    type: EDIT_USER_PROFILE,
    payload: data
  };
};

/**
 * Edit User Profile Image
 *
 * @export
 * @param {any} imageUrl
 * @returns {Object} dispatch object
 */
export function editUserProfileImage(imageUrl) {
  const config = {
    headers: {
      'user-token': token
    }
  };
  const formdata = querystring.stringify({
    imageUrl
  });
  return (dispatch) => {
    axios
      .put(`${routes.user}/${userdata.userid}`, formdata, config)
      .then((response) => {
        if (response.data.success) {
          dispatch(editUserProfileImageSync(response.data));
        }
      });
  };

}
