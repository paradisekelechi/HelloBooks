import expect from 'expect';
import moxios from 'moxios';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import routes from '../../../tools/Routes';
import {
  GET_ACCOUNTTYPES
} from '../../helpers/Constants';
import {
  getAccountTypes,
  getAccountTypesSync
} from '../../actions/AccountType';

jest.mock('../../helpers/Alert.js');
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const store = mockStore({});

describe('AccountType actions', () => {
  it('should create an action to get account types', () => {
    const payload = {
      success: true,
      message: 'successful'
    };
    const expectedAction = {
      type: GET_ACCOUNTTYPES,
      payload
    };
    expect(getAccountTypesSync(payload)).toEqual(expectedAction);
  });
});

describe('AccountType thunk actions', () => {
  beforeEach(() => {
    moxios.install();
  });
  afterEach(() => {
    moxios.uninstall();
  });
  const mocked = {
    data: {
      dataResponse: [{}]
    }
  };
  it('creates GET_ACCOUNTTYPES when getting accounttypes', async (done) => {
    moxios.stubRequest(routes.accountType, {
      status: 200,
      response: mocked
    });
    await store.dispatch(getAccountTypes()).then(() => {
      const actions = store.getActions();
      expect(actions[0].type).toEqual(GET_ACCOUNTTYPES);
    });
    done();
  });
  it('does not create GET_ACCOUNTTYPES when getting accounttypes', async (done) => {
    moxios.stubRequest(routes.accountType, {
      status: 400,
      response: mocked
    });
    await store.dispatch(getAccountTypes()).then(() => {
      const actions = store.getActions();
      expect(actions[1]).toEqual(undefined);
    });
    done();
  });
});
