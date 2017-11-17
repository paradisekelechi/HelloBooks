import * as actionConstants from '../utils/Constants';
import {
  getUserType,
  getAccountType
} from '../utils/TypeSync';

const initialState = [{
  token: '',
  username: '',
  email: '',
  usertype: '',
  accounttype: '',
}];

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
      accounttype: getAccountType(action.payload.accounttype)
    }, ...state];
  default:
    return state;
  }
};

export default userReducer;
