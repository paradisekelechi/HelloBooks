import expect from 'expect';
import {
  SIGNIN_USER,
  SIGNUP_USER,
  LOGOUT_USER,
  GOOGLE_SIGNIN_USER
} from '../../helpers/Constants';
import {
  signinUserAsync,
  signupUserAsync,
  googleSigninUserAsync,
  logoutUserAsync
} from '../../actions/Authentication';

describe('Authentication actions', () => {
  it('should create an action to signin user', () => {
    const payload = {
      success: true,
      message: 'successful'
    };
    const expectedAction = {
      type: SIGNIN_USER,
      payload
    };
    expect(signinUserAsync(payload)).toEqual(expectedAction);
  });
  it('should create an action to signup user', () => {
    const payload = {
      success: true,
      message: 'successful'
    };
    const expectedAction = {
      type: SIGNUP_USER,
      payload
    };

    expect(signupUserAsync(payload)).toEqual(expectedAction);
  });
  it('should create an action to logout user', () => {
    const user = {
      success: true,
      message: 'successful'
    };
    const expectedAction = {
      type: LOGOUT_USER,
      user
    };

    expect(logoutUserAsync(user)).toEqual(expectedAction);
  });
  it('should create an action to signin user using google signin', () => {
    const payload = {
      success: true,
      message: 'successful'
    };
    const expectedAction = {
      type: GOOGLE_SIGNIN_USER,
      payload
    };

    expect(googleSigninUserAsync(payload)).toEqual(expectedAction);
  });
});
