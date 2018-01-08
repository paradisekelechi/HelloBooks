
/**
 * Get Account type of user
 *
 * @param {Int} accountTypeId
 * @returns {String} The account type ofthe user
 */
export const getAccountType = (accountTypeId) => {
  const id = accountTypeId;
  let accountType;
  if (id === 1) {
    accountType = 'SILVER';
  }
  if (id === 2) {
    accountType = 'GOLD';
  }
  if (id === 3) {
    accountType = 'PLATINIUM';
  }
  return accountType;
};

/**
 * Get Usertype of the user
 *
 * @param {Int} userTypeId
 * @returns {String} Usertype of the user
 */
export const getUserType = (userTypeId) => {
  const id = userTypeId;
  let userType;
  if (id === 1) {
    userType = 'CLIENT';
  }
  if (id === 2) {
    userType = 'ADMIN';
  }
  return userType;
};
