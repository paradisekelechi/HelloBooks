import jwtDecode from 'jwt-decode';

/**
 *
 * @returns {boolean} the set status of the token
 * @export
 * @param {string} usertoken
 */
export function authenticatePersist(usertoken) {
  let isTokenSet = false;
  if (usertoken) {
    localStorage.setItem('userdata', JSON.stringify({
      token: usertoken
    }));
    isTokenSet = true;
  }
  return isTokenSet;
}

/**
 *
 *
 * @export
 * @returns {object} Userdata object
 */
export function authenticateFetch() {
  const storageData = JSON.parse(localStorage.getItem('userdata'));
  if (storageData) {
    const {
      token
    } = storageData;
    const userData = jwtDecode(token);
    return {
      loggedIn: true,
      userdata: userData,
      token
    };
  }
  return {
    loggedIn: false,
    userdata: {}
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
