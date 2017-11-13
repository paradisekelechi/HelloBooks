import * as actionConstants from '../utils/actionConstants';

const initialState = [{
  token: '',
  username: '',
  email: '',
  usertype: '',
  accounttype: '',
}];

const getAccountType = (accountTypeId) => {
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

const getUserType = (userTypeId) => {
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

/**
 *
 *
 * @export
 * @param {any} state
 * @param {any} action
 * @returns {object} State object
 */
const userReducer = (state = initialState, action) => {
  switch (action.type) {
  case actionConstants.SIGNUP_USER:
  case actionConstants.SIGNIN_USER:
    return [{
      token: action.payload.token,
      username: action.payload.username,
      email: action.payload.email,
      usertype: getUserType(action.payload.usertype),
      accounttype: getAccountType(action.payload.accounttype),
    },
    ...state
    ];
  case actionConstants.LOGOUT_USER:
  default:
    return state;
  }
};

export default userReducer;
