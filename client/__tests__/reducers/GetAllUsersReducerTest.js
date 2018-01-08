import expect from 'expect';
import {
  GET_ALL_USERS
} from '../../helpers/Constants';
import GetAllUsersReducer from '../../reducers/users/GetAllUsersReducer';

describe('Get All Users Reducer', () => {
  it('should return initial state', () => {
    const initialState = [{
      count: 0,
      list: [],
      isLoading: true
    }];
    expect(GetAllUsersReducer(undefined, {})).toEqual(initialState);
  });
  it('should handle  GET_ALL_USERS', () => {
    const mockAction = {
      type: GET_ALL_USERS,
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
      }],
      isLoading: false
    }];
    expect(GetAllUsersReducer([], mockAction)).toEqual(expectedResult);
  });
});
