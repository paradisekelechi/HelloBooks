import expect from 'expect';
import {
  GOOGLE_SIGNIN_USER
} from '../../helpers/Constants';
import GoogleSigninReducer from '../../reducers/authentication/GoogleSigninReducer';
import {
  getAccountType,
  getUserType
} from '../../helpers/TypeSync';

describe('GoogleSigninReducer test', () => {
  it('should return the initial state', () => {
    const initialState = [{
      token: '',
      username: '',
      email: '',
      usertype: '',
      accounttype: '',
    }];
    expect(GoogleSigninReducer(undefined, {})).toEqual(initialState);
  });
  it('should handle GOOGLE_SIGNIN_USER', () => {
    const action = {
      type: GOOGLE_SIGNIN_USER,
      payload: {
        token: 'token',
        username: 'kelechi',
        email: 'paradisekelechi@gmail.com',
        usertype: 1,
        accounttype: 2
      }
    };
    const expectedResult = [{
      token: 'token',
      username: 'kelechi',
      email: 'paradisekelechi@gmail.com',
      usertype: getUserType(1),
      accounttype: getAccountType(2)
    }];
    expect(GoogleSigninReducer([], action)).toEqual(expectedResult);
  });
});
