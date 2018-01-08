import expect from 'expect';
import {
  GET_DELETED_USERS
} from '../../helpers/Constants';
import GetDeletedUsersReducer from '../../reducers/users/GetDeletedUsersReducer';

describe('Get Deleted Users Reducer', () => {
  it('should return initial state', () => {
    const initialState = [{
      count: 0,
      list: []
    }];
    expect(GetDeletedUsersReducer(undefined, {})).toEqual(initialState);
  });
  it('should handle  GET_DELETED_USERS', () => {
    const mockAction = {
      type: GET_DELETED_USERS,
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
    expect(GetDeletedUsersReducer([], mockAction)).toEqual(expectedResult);
  });
});
