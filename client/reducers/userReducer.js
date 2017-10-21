import * as actionConstants from '../utils/actionConstants';

const initialState = {
  token: '',
  username: '',
  email: '',
  usertype: '',
  accounttype: '',
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
    return Object.assign(
      {},
      state,
      {
        token: action.payload.token,
        username: action.payload.username,
        email: action.payload.email,
        usertype: action.payload.usertype === 1 ? 'CLIENT' : 'ADMIN',
        accounttype: action.payload.accounttype === 1 ? 'SILVER' : action.payload.accounttype === 2 ? 'GOLD' : 'PLATINIUM',
      }
    );
  case actionConstants.LOGOUT_USER:
  default:
    return state;
  }
};

export default userReducer;
