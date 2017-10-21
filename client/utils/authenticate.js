// import jwt from 'jsonwebtoken';
import jwtDecode from 'jwt-decode';

/**
 *
 * @returns {void} description
 * @export
 * @param {any} usertoken
 */
export function authenticatePersist(usertoken) {
  localStorage.setItem('userdata', JSON.stringify({
    token: usertoken
  }));
}

/**
 *
 *
 * @export
 * @returns {object} Userdata object
 */
export function authenticateFetch() {
  const storageData = JSON.parse(localStorage.getItem('userdata'));
  const { token } = storageData;
  const userData = jwtDecode(storageData.token);
  return {
    loggedIn: true,
    userdata: userData,
    token
  };
}

/**
 *
 * @returns {void} description
 * @export
 */
export function authenticateClear() {
  localStorage.removeItem('userdata');
}
