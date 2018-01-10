import expect from 'expect';
import moxios from 'moxios';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import * as router from 'react-router';
import routes from '../../../tools/Routes';
import {
  SIGNIN_USER,
  SIGNUP_USER,
  LOGOUT_USER,
  GOOGLE_SIGNIN_USER
} from '../../helpers/Constants';
import {
  signinUserAsync,
  signinUser,
  signupUserAsync,
  signupUser,
  googleSigninUserAsync,
  googleSigninUser,
  logoutUserAsync
} from '../../actions/Authentication';

jest.mock('../../helpers/Alert.js');
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
let store;

describe('Authentication actions', () => {
  it('should create an action to signin user', () => {
    const payload = {
      success: true,
      message: 'successful'
    };
    const expectedAction = {
      type: SIGNIN_USER,
      payload
    };
    expect(signinUserAsync(payload)).toEqual(expectedAction);
  });
  it('should create an action to signup user', () => {
    const payload = {
      success: true,
      message: 'successful'
    };
    const expectedAction = {
      type: SIGNUP_USER,
      payload
    };

    expect(signupUserAsync(payload)).toEqual(expectedAction);
  });
  it('should create an action to logout user', () => {
    const user = {
      success: true,
      message: 'successful'
    };
    const expectedAction = {
      type: LOGOUT_USER,
      user
    };

    expect(logoutUserAsync(user)).toEqual(expectedAction);
  });
  it('should create an action to signin user using google signin', () => {
    const payload = {
      success: true,
      message: 'successful'
    };
    const expectedAction = {
      type: GOOGLE_SIGNIN_USER,
      payload
    };

    expect(googleSigninUserAsync(payload)).toEqual(expectedAction);
  });
});
describe('Authentication thunk actions', () => {
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
      payload: [{}]
    }
  };
  it('creates SIGNIN_USER when dispatching signin user', async (done) => {
    moxios.stubRequest(routes.signin, {
      status: 200,
      response: mocked
    });
    const user = {
      username: 'testUsername',
      password: 'testPassword'
    };
    router.browserHistory = {
      push: () => {}
    };
    router.Alert = {};
    await store.dispatch(signinUser(user)).then(() => {
      const actions = store.getActions();
      expect(actions[0].type).toEqual(SIGNIN_USER);
    });
    done();
  });
  it('does not create SIGNIN_USER when dispatching signin user due to error response', async (done) => {
    moxios.stubRequest(routes.signin, {
      status: 400,
      response: mocked
    });
    const user = {
      username: 'testUsername',
      password: 'testPassword'
    };
    router.browserHistory = {
      push: () => {}
    };
    router.Alert = {};
    await store.dispatch(signinUser(user)).then(() => {
      const actions = store.getActions();
      expect(actions[0]).toEqual(undefined);
    });
    done();
  });
  it('creates SIGNUP_USER when dispatching signup user', async (done) => {
    moxios.stubRequest(routes.signup, {
      status: 200,
      response: mocked
    });
    const user = {
      username: 'testUsername',
      password: 'testPassword',
      email: 'email'
    };
    router.browserHistory = {
      push: () => {}
    };
    await store.dispatch(signupUser(user)).then(() => {
      const actions = store.getActions();
      expect(actions[0].type).toEqual(SIGNUP_USER);
    });
    done();
  });
  it('does not create SIGNUP_USER when dispatching signup user due to error response', async (done) => {
    moxios.stubRequest(routes.signup, {
      status: 400,
      response: mocked
    });
    const user = {
      username: 'testUsername',
      password: 'testPassword',
      email: 'email'
    };
    router.browserHistory = {
      push: () => {}
    };
    await store.dispatch(signupUser(user)).then(() => {
      const actions = store.getActions();
      expect(actions[0]).toEqual(undefined);
    });
    done();
  });
  it('creates GOOGLE_SIGNIN_USER when dispatching google signin user', async (done) => {
    moxios.stubRequest(routes.googleSignin, {
      status: 200,
      response: mocked
    });
    const user = {
      username: 'testUsername',
      password: 'testPassword',
      email: 'email'
    };
    router.browserHistory = {
      push: () => {}
    };
    await store.dispatch(googleSigninUser(user)).then(() => {
      const actions = store.getActions();
      expect(actions[0].type).toEqual(GOOGLE_SIGNIN_USER);
    });
    done();
  });
  it('does not create GOOGLE_SIGNIN_USER when dispatching google signin user due to error responses', async (done) => {
    moxios.stubRequest(routes.googleSignin, {
      status: 400,
      response: mocked
    });
    const user = {
      username: 'testUsername',
      password: 'testPassword',
      email: 'email'
    };
    router.browserHistory = {
      push: () => {}
    };
    await store.dispatch(googleSigninUser(user)).then(() => {
      const actions = store.getActions();
      expect(actions[0]).toEqual(undefined);
    });
    done();
  });
});
