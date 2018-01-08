import expect from 'expect';
import {
  GET_CLIENT_USERS
} from '../../helpers/Constants';
import GetClientUsersReducer from '../../reducers/users/GetClientUsersReducer';

describe('Get Client Users Reducer', () => {
  it('should return initial state', () => {
    const initialState = [{
      count: 0,
      list: []
    }];
    expect(GetClientUsersReducer(undefined, {})).toEqual(initialState);
  });
  it('should handle  GET_CLIENT_USERS', () => {
    const mockAction = {
      type: GET_CLIENT_USERS,
      payload: {
        users: {
          rows: [{
            name: 'Test user'
          }],
          count: 1
        }
      }
    };
    const expectedResult = [{
      count: 1,
      list: [{
        name: 'Test user'
      }]
    }];
    expect(GetClientUsersReducer([], mockAction)).toEqual(expectedResult);
  });
});
