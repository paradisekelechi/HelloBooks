import jwtDecode from 'jwt-decode';

/**
 * Persist user data and token to the local storage
 *
 * @returns {Boolean} the set status of the token
 *
 * @export
 * @param {String} usertoken
 */
export function authenticatePersist(usertoken) {
  if (usertoken) {
    localStorage.setItem('userdata', JSON.stringify({
      token: usertoken
    }));
    return true;
  }
  return false;
}

/**
 * Fetch application's userdat from the local storage
 *
 * @export
 * @returns {Object} Userdata object
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
 * Clear usertoken from the local storage
 *
 * @returns {Boolean} logout status
 * @export
 */
export function authenticateClear() {
  const storageData = JSON.parse(localStorage.getItem('userdata'));
  let isLoggedOut = false;
  if (storageData) {
    localStorage.removeItem('userdata');
    isLoggedOut = true;
  }
  return isLoggedOut;
}
