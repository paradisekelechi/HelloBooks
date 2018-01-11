import expect from 'expect';
import {
  SIGNUP_USER
} from '../../helpers/Constants';
import SignupReducer from '../../reducers/authentication/SignupReducer';
import {
  getAccountType,
  getUserType
} from '../../helpers/TypeSync';


describe('Signup Reducer', () => {
  it('should return initial state', () => {
    const initialState = [{
      token: '',
      username: '',
      email: '',
      usertype: '',
      accounttype: '',
    }];
    expect(SignupReducer(undefined, {})).toEqual(initialState);
  });
  it('should handle SIGNUP_USER', () => {
    const action = {
      type: SIGNUP_USER,
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
    expect(SignupReducer([], action)).toEqual(expectedResult);
  });
});
