import expect from 'expect';
import moxios from 'moxios';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import * as router from 'react-router';
import routes from '../../../tools/Routes';
import {
  GET_USERTYPES
} from '../../helpers/Constants';
import {
  getUsertypesSync,
  getUsertypes
} from '../../actions/UserType';

jest.mock('../../helpers/Alert.js');
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
let store;

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

describe('Usertype thunk actions', () => {
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
  it('creates GET_USERTYPES when dispatching get usertypes', async (done) => {
    moxios.stubRequest(routes.userType, {
      status: 200,
      response: mocked
    });
    router.browserHistory = {
      push: () => {}
    };
    await store.dispatch(getUsertypes()).then(() => {
      const actions = store.getActions();
      expect(actions[0].type).toEqual(GET_USERTYPES);
    });
    done();
  });
  it('does not create GET_USERTYPES when dispatching get usertypes due to error response', async (done) => {
    moxios.stubRequest(routes.userType, {
      status: 400,
      response: mocked
    });
    router.browserHistory = {
      push: () => {}
    };
    await store.dispatch(getUsertypes()).then(() => {
      const actions = store.getActions();
      expect(actions[0]).toNotExist();
    });
    done();
  });
});

