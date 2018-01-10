/**
 *  @fileOverview  User action file
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
import querystring from 'querystring';

import {
  EDIT_USER_PROFILE,
  UPDATE_PASSWORD,
  GET_DELETED_USERS,
  GET_ADMIN_USERS,
  GET_CLIENT_USERS,
  GET_ALL_USERS
} from '../helpers/Constants';
import routes from '../../tools/Routes';
import {
  authenticateFetch,
} from '../helpers/Authentication';
import Alert from '../helpers/Alert';

const {
  token,
  userdata
} = authenticateFetch();

export const getAllUsersSync = payload => ({
  type: GET_ALL_USERS,
  payload
});
/**
 * Get all users action
 * @export getAllUsers
 *
 * @returns {object} dispatch object
 */
export const getAllUsers = () => {
  const config = {
    headers: {
      'user-token': token
    }
  };
  return (dispatch) => {
    return axios
      .get(routes.getAllUsers, config)
      .then((response) => {
        dispatch(getAllUsersSync(response.data));
      }).catch((error) => {
        Alert('error', error.response.data.message, null);
      });
  };
};


export const getAdminUsersSync = payload => ({
  type: GET_ADMIN_USERS,
  payload
});
/**
 * Get admin users action
 *
 * @export getAdminUsers
 *
 * @returns {object} dispatch object
 */
export const getAdminUsers = () => {
  const config = {
    headers: {
      'user-token': token
    }
  };
  return (dispatch) => {
    return axios
      .get(routes.getAdminUsers, config)
      .then((response) => {
        dispatch(getAdminUsersSync(response.data));
      }).catch((error) => {
        Alert('error', error.response.data.message, null);
      });
  };
};


export const getClientUsersSync = payload => ({
  type: GET_CLIENT_USERS,
  payload
});
/**
 * Get client users action
 *
 * @export getClientUsers
 *
 * @returns {object} dispatch object
 */
export const getClientUsers = () => {
  const config = {
    headers: {
      'user-token': token
    }
  };
  return (dispatch) => {
    return axios
      .get(routes.getClientUsers, config)
      .then((response) => {
        dispatch(getClientUsersSync(response.data));
      }).catch((error) => {
        Alert('error', error.response.data.message, null);
      });
  };
};


export const getDeletedUsersSync = payload => ({
  type: GET_DELETED_USERS,
  payload
});
/**
 * Get deleted users action
 *
 * @export getDeletedUsers
 *
 * @returns {object} dispatch object
 */
export const getDeletedUsers = () => {
  const config = {
    headers: {
      'user-token': token
    }
  };
  return (dispatch) => {
    return axios
      .get(routes.getDeletedUsers, config)
      .then((response) => {
        dispatch(getDeletedUsersSync(response.data));
      }).catch((error) => {
        Alert('error', error.response.data.message, null);
      });
  };
};

export const editUserProfileImageSync = (data) => {
  return {
    type: EDIT_USER_PROFILE,
    payload: data
  };
};

/**
 * Edit User Profile Image
 *
 * @export editUserProfileImage
 *
 * @param {String} imageUrl
 *
 * @returns {Object} dispatch object
 */
export const editUserProfileImage = (imageUrl) => {
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
      .put(`${routes.editUser}/${userdata.userid}`, formdata, config)
      .then((response) => {
        if (response.data.success) {
          dispatch(editUserProfileImageSync(response.data));
        }
      }).catch((error) => {
        Alert('error', error.response.data.message, null);
      });
  };
};

export const updatePasswordSync = payload => ({
  type: UPDATE_PASSWORD,
  payload
});
/**
 * Update password action
 *
 * @export updatePassword
 *
 * @param {any} userId
 * @param {any} formdata
 *
 * @returns {Object} dispatch object
 */
export const updatePassword = (userId, formdata) => {
  const config = {
    headers: {
      'user-token': token
    }
  };
  const url = routes.editUser;
  return (dispatch) => {
    axios
      .put(`${url}/${userId}/password`, formdata, config)
      .then((response) => {
        dispatch(updatePasswordSync(response.data));
        Alert('success', response.data.message, null);
      }).catch((error) => {
        Alert('error', error.response.data.message, null);
      });
  };
};
