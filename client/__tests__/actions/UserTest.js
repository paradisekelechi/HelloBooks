import expect from 'expect';
import {
  EDIT_USER_PROFILE,
  UPDATE_PASSWORD,
  GET_DELETED_USERS,
  GET_ADMIN_USERS,
  GET_CLIENT_USERS,
  GET_ALL_USERS
} from '../../helpers/Constants';
import {
  editUserProfileImageSync,
  updatePasswordSync,
  getDeletedUsersSync,
  getAdminUsersSync,
  getClientUsersSync,
  getAllUsersSync
} from '../../actions/User';


describe('User actions', () => {
  it('should create an action to edits user profile image', () => {
    const payload = {
      success: true,
      message: 'successful'
    };
    const expectedAction = {
      type: EDIT_USER_PROFILE,
      payload
    };
    expect(editUserProfileImageSync(payload)).toEqual(expectedAction);
  });
  it('should create an action to update user password', () => {
    const payload = {
      success: true,
      message: 'successful'
    };
    const expectedAction = {
      type: UPDATE_PASSWORD,
      payload
    };
    expect(updatePasswordSync(payload)).toEqual(expectedAction);
  });
  it('should create an action to get deleted users', () => {
    const payload = {
      success: true,
      message: 'successful'
    };
    const expectedAction = {
      type: GET_DELETED_USERS,
      payload
    };
    expect(getDeletedUsersSync(payload)).toEqual(expectedAction);
  });
  it('should create an action to get admin users', () => {
    const payload = {
      success: true,
      message: 'successful'
    };
    const expectedAction = {
      type: GET_ADMIN_USERS,
      payload
    };
    expect(getAdminUsersSync(payload)).toEqual(expectedAction);
  });
  it('should create an action to get client users', () => {
    const payload = {
      success: true,
      message: 'successful'
    };
    const expectedAction = {
      type: GET_CLIENT_USERS,
      payload
    };
    expect(getClientUsersSync(payload)).toEqual(expectedAction);
  });
  it('should create an action to get all users', () => {
    const payload = {
      success: true,
      message: 'successful'
    };
    const expectedAction = {
      type: GET_ALL_USERS,
      payload
    };
    expect(getAllUsersSync(payload)).toEqual(expectedAction);
  });
});
