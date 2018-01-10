import expect from 'expect';
import moxios from 'moxios';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import * as router from 'react-router';
import routes from '../../../tools/Routes';
import {
  GET_BOOK_CATEGORIES,
  ADD_CATEGORY
} from '../../helpers/Constants';
import {
  getCategoriesSync,
  getCategories,
  addCategorySync,
  addCategory
} from '../../actions/Category';


jest.mock('../../helpers/Alert.js');
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
let store;

describe('Category actions', () => {
  it('should create an action to gets book categories', () => {
    const payload = {
      success: true,
      message: 'successful'
    };
    const expectedAction = {
      type: GET_BOOK_CATEGORIES,
      payload
    };
    expect(getCategoriesSync(payload)).toEqual(expectedAction);
  });
  it('should create an action to adds book category', () => {
    const payload = {
      success: true,
      message: 'successful'
    };
    const expectedAction = {
      type: ADD_CATEGORY,
      payload
    };
    expect(addCategorySync(payload)).toEqual(expectedAction);
  });
});


describe('Category thunk actions', () => {
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
  it('creates GET_BOOK_CATEGORIES when dispatching get book categories', async (done) => {
    moxios.stubRequest(routes.bookCategory, {
      status: 200,
      response: mocked
    });
    router.browserHistory = {
      push: () => {}
    };
    await store.dispatch(getCategories()).then(() => {
      const actions = store.getActions();
      expect(actions[0].type).toEqual(GET_BOOK_CATEGORIES);
    });
    done();
  });
  it('does not create GET_BOOK_CATEGORIES when dispatching get book categories due to error response', async (done) => {
    moxios.stubRequest(routes.bookCategory, {
      status: 400,
      response: mocked
    });
    router.browserHistory = {
      push: () => {}
    };
    await store.dispatch(getCategories()).then(() => {
      const actions = store.getActions();
      expect(actions[0]).toEqual(undefined);
    });
    done();
  });
  it('creates ADD_CATEGORY when dispatching add book category', async (done) => {
    moxios.stubRequest(routes.bookCategory, {
      status: 200,
      response: mocked
    });
    router.browserHistory = {
      push: () => {}
    };
    await store.dispatch(addCategory()).then(() => {
      const actions = store.getActions();
      expect(actions[0].type).toEqual(ADD_CATEGORY);
    });
    done();
  });
  it('does not create ADD_CATEGORY when dispatching add book category due to error response', async (done) => {
    moxios.stubRequest(routes.bookCategory, {
      status: 400,
      response: mocked
    });
    router.browserHistory = {
      push: () => {}
    };
    await store.dispatch(addCategory()).then(() => {
      const actions = store.getActions();
      expect(actions[0]).toNotExist();
    });
    done();
  });
});
