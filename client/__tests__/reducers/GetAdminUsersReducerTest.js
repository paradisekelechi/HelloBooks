import expect from 'expect';
import {
  GET_ADMIN_USERS
} from '../../helpers/Constants';
import GetAdminUsersReducer from '../../reducers/users/GetAdminUsersReducer';

describe('Get Admin Users Reducer', () => {
  it('should return initial state', () => {
    const initialState = [{
      count: 0,
      list: []
    }];
    expect(GetAdminUsersReducer(undefined, {})).toEqual(initialState);
  });
  it('should handle  GET_ADMIN_USERS', () => {
    const mockAction = {
      type: GET_ADMIN_USERS,
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
    expect(GetAdminUsersReducer([], mockAction)).toEqual(expectedResult);
  });
});
