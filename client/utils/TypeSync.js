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
