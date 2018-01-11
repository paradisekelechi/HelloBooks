import expect from 'expect';
import {
  SIGNIN_USER
} from '../../helpers/Constants';
import SigninReducer from '../../reducers/authentication/SigninReducer';
import {
  getAccountType,
  getUserType
} from '../../helpers/TypeSync';


describe('Signin Reducer', () => {
  it('should return initial state', () => {
    const initialState = [{
      token: '',
      username: '',
      email: '',
      usertype: '',
      accounttype: '',
    }];
    expect(SigninReducer(undefined, {})).toEqual(initialState);
  });
  it('should handle GOOGLE_SIGNIN_USER', () => {
    const action = {
      type: SIGNIN_USER,
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
    expect(SigninReducer([], action)).toEqual(expectedResult);
  });
});
