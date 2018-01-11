import expect from 'expect';
import moxios from 'moxios';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import * as router from 'react-router';
import routes from '../../../tools/Routes';
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
  getDeletedUsers,
  getAdminUsersSync,
  getAdminUsers,
  getClientUsersSync,
  getClientUsers,
  getAllUsersSync,
  getAllUsers
} from '../../actions/User';

jest.mock('../../helpers/Alert.js');
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
let store;

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

describe('Users thunk actions', () => {
  beforeEach(() => {
    moxios.install();
    store = mockStore({});
  });
  afterEach(() => {
    moxios.uninstall();
  });
  const mocked = {
    data: {
      message: 'test message',
      payload: [{}],
      bookId: 1
    }
  };
  it('creates GET_ALL_USERS when dispatching get all users', async (done) => {
    moxios.stubRequest(routes.getAllUsers, {
      status: 200,
      response: mocked
    });
    router.browserHistory = {
      push: () => {}
    };
    await store.dispatch(getAllUsers()).then(() => {
      const actions = store.getActions();
      expect(actions[0].type).toEqual(GET_ALL_USERS);
    });
    done();
  });
  it('does not create GET_ALL_USERS when dispatching get all users due to error response', async (done) => {
    moxios.stubRequest(routes.getAllUsers, {
      status: 400,
      response: mocked
    });
    router.browserHistory = {
      push: () => {}
    };
    await store.dispatch(getAllUsers()).then(() => {
      const actions = store.getActions();
      expect(actions[0]).toNotExist();
    });
    done();
  });
  it('creates GET_DELETED_USERS when dispatching get deleted users', async (done) => {
    moxios.stubRequest(routes.getDeletedUsers, {
      status: 200,
      response: mocked
    });
    router.browserHistory = {
      push: () => {}
    };
    await store.dispatch(getDeletedUsers()).then(() => {
      const actions = store.getActions();
      expect(actions[0].type).toEqual(GET_DELETED_USERS);
    });
    done();
  });
  it('does not create GET_DELETED_USERS when dispatching get deleted users due to error response', async (done) => {
    moxios.stubRequest(routes.getDeletedUsers, {
      status: 400,
      response: mocked
    });
    router.browserHistory = {
      push: () => {}
    };
    await store.dispatch(getDeletedUsers()).then(() => {
      const actions = store.getActions();
      expect(actions[0]).toNotExist();
    });
    done();
  });
  it('creates GET_ADMIN_USERS when dispatching get admin users', async (done) => {
    moxios.stubRequest(routes.getAdminUsers, {
      status: 200,
      response: mocked
    });
    router.browserHistory = {
      push: () => {}
    };
    await store.dispatch(getAdminUsers()).then(() => {
      const actions = store.getActions();
      expect(actions[0].type).toEqual(GET_ADMIN_USERS);
    });
    done();
  });
  it('does not create GET_ADMIN_USERS when dispatching get admin users due to error response', async (done) => {
    moxios.stubRequest(routes.getAdminUsers, {
      status: 400,
      response: mocked
    });
    router.browserHistory = {
      push: () => {}
    };
    await store.dispatch(getAdminUsers()).then(() => {
      const actions = store.getActions();
      expect(actions[0]).toNotExist();
    });
    done();
  });
  it('creates GET_CLIENT_USERS when dispatching get client users', async (done) => {
    moxios.stubRequest(routes.getClientUsers, {
      status: 200,
      response: mocked
    });
    router.browserHistory = {
      push: () => {}
    };
    await store.dispatch(getClientUsers()).then(() => {
      const actions = store.getActions();
      expect(actions[0].type).toEqual(GET_CLIENT_USERS);
    });
    done();
  });
  it('does not create GET_CLIENT_USERS when dispatching get client users due to error response', async (done) => {
    moxios.stubRequest(routes.getClientUsers, {
      status: 400,
      response: mocked
    });
    router.browserHistory = {
      push: () => {}
    };
    await store.dispatch(getClientUsers()).then(() => {
      const actions = store.getActions();
      expect(actions[0]).toNotExist();
    });
    done();
  });
});
