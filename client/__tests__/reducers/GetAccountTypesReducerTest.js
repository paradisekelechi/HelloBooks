import expect from 'expect';
import GetAccountTypesReducer from '../../reducers/accounttypes/GetAccountTypesReducer';
import {
  GET_ACCOUNTTYPES
} from '../../helpers/Constants';

describe('GetAccountTypesReducer test', () => {
  it('should return the initial state', () => {
    const initialState = [{
      message: '',
      list: [],
      count: 0
    }];
    expect(GetAccountTypesReducer(undefined, {})).toEqual(initialState);
  });
  it('should handle GET_ACCOUNTTYPES', () => {
    const action = {
      type: GET_ACCOUNTTYPES,
      payload: {
        message: 'Message',
        accounttype: {
          rows: ['Data'],
          count: 1
        }
      }
    };
    const expectedResult = [{
      message: 'Message',
      list: ['Data'],
      count: 1
    }];
    expect(GetAccountTypesReducer([], action)).toEqual(expectedResult);
  });
});
