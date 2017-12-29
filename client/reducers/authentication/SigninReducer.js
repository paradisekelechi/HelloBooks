import {
  SIGNIN_USER
} from '../../helpers/Constants';
import {
  getUserType,
  getAccountType
} from '../../helpers/TypeSync';

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
const SignInReducer = (state = initialState, action) => {
  switch (action.type) {
  case SIGNIN_USER:
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

export default SignInReducer;
