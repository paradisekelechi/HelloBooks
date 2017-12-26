import axios from 'axios';
import querystring from 'querystring';

import {
  EDIT_USER_PROFILE,
  GET_DELETED_USERS,
  GET_ADMIN_USERS,
  GET_CLIENT_USERS,
  GET_ALL_USERS
} from '../helpers/Constants';
import routes from '../../tools/Routes';
import {
  authenticateFetch,
} from '../helpers/Authentication';

const {
  token,
  userdata
} = authenticateFetch();


const getAllUsersSync = payload => ({
  type: GET_ALL_USERS,
  payload
});
/**
 * @export
 * @returns {object} dispatch object
 */
export const getAllUsers = () => {
  const config = {
    headers: {
      'user-token': token
    }
  };
  return (dispatch) => {
    axios
      .get(routes.getAllUsers, config)
      .then((response) => {
        if (response.data.success) {
          dispatch(getAllUsersSync(response.data));
        }
      }).catch((error) => {
        const {
          data
        } = error.response;
        Materialize.toast(data.message, 3000, `${data.success ? 'blue' : 'red'} rounded`);
      });
  };
};


const getAdminUsersSync = payload => ({
  type: GET_ADMIN_USERS,
  payload
});
/**
 * @export
 * @returns {object} dispatch object
 */
export const getAdminUsers = () => {
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
      }).catch((error) => {
        const {
          data
        } = error.response;
        Materialize.toast(data.message, 3000, `${data.success ? 'blue' : 'red'} rounded`);
      });
  };
};


const getClientUsersSync = payload => ({
  type: GET_CLIENT_USERS,
  payload
});
/**
 * @export
 * @returns {object} dispatch object
 */
export const getClientUsers = () => {
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
      }).catch((error) => {
        const {
          data
        } = error.response;
        Materialize.toast(data.message, 3000, `${data.success ? 'blue' : 'red'} rounded`);
      });
  };
};


const getDeletedUsersSync = payload => ({
  type: GET_DELETED_USERS,
  payload
});
/**
 * @export
 * @returns {object} dispatch object
 */
export const getDeletedUsers = () => {
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
      }).catch((error) => {
        const {
          data
        } = error.response;
        Materialize.toast(data.message, 3000, `${data.success ? 'blue' : 'red'} rounded`);
      });
  };
};

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
      .put(`${routes.user}/${userdata.userid}`, formdata, config)
      .then((response) => {
        if (response.data.success) {
          dispatch(editUserProfileImageSync(response.data));
        }
      }).catch((error) => {
        const {
          data
        } = error.response;
        Materialize.toast(data.message, 3000, `${data.success ? 'blue' : 'red'} rounded`);
      });
  };
};
