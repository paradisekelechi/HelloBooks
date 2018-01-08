import expect from 'expect';
import {
  GET_USERTYPES
} from '../../helpers/Constants';
import {
  getUsertypesSync
} from '../../actions/UserType';

describe('Usertype actions', () => {
  it('should create an action to get all users', () => {
    const payload = {
      success: true,
      message: 'successful'
    };
    const expectedAction = {
      type: GET_USERTYPES,
      payload
    };
    expect(getUsertypesSync(payload)).toEqual(expectedAction);
  });
});
