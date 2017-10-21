import axios from 'axios';
import { GET_ALL_USERS } from '../utils/actionConstants';

const getUsersSync = users => ({
  type: GET_ALL_USERS,
  users
});
/**
 * @export
 * @param {any} users
 * @returns {object} object
 */
export function getUsers(users) {
  return (dispatch) => {
    axios
      .get()
      .then((response) => {
        if (response) {
          dispatch(getUsersSync(users));
        }
      });
  };
}

const getAdminUsersSync = users => ({
  type: GET_ALL_USERS,
  users
});
/**
 *
 * @export
 * @param {any} users
 * @returns {void} Dispatch object
 */
export function getAdminUsers(users) {
  return (dispatch) => {
    axios
      .get()
      .then((response) => {
        if (response) {
          dispatch(getAdminUsersSync(users));
        }
      });
  };
}

