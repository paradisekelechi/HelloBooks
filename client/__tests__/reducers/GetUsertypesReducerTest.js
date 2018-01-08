import expect from 'expect';
import GetUsertypesReducer from '../../reducers/usertypes/GetUsertypesReducer';
import {
  GET_USERTYPES
} from '../../helpers/Constants';

describe('GetUsertypesReducer test', () => {
  it('should return the initial state', () => {
    const initialState = [{
      message: '',
      list: [],
      count: 0
    }];
    expect(GetUsertypesReducer(undefined, {})).toEqual(initialState);
  });
  it('should handle GET_USERTYPES', () => {
    const action = {
      type: GET_USERTYPES,
      payload: {
        message: 'Message',
        usertype: {
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
    expect(GetUsertypesReducer([], action)).toEqual(expectedResult);
  });
});
