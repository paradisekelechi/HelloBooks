import expect from 'expect';
import moxios from 'moxios';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import * as router from 'react-router';
import routes from '../../../tools/Routes';
import {
  ADD_BOOK,
  EDIT_BOOK,
  DELETE_BOOK,
  GET_BOOKS,
  GET_BOOKS_AVAILABLE,
  GET_BOOKS_DELETED,
  GET_BOOKS_FINISHED,
  GET_PENDING_BOOKS,
  GET_SINGLE_BOOK
} from '../../helpers/Constants';
import {
  addBookSync,
  addBook,
  editBookSync,
  editBook,
  deleteBookSync,
  deleteBook,
  getBooksSync,
  getBooks,
  getBooksAvailableSync,
  getBooksAvailable,
  getBooksDeletedSync,
  getBooksDeleted,
  getBooksFinishedSync,
  getBooksFinished,
  getPendingBooksSync,
  getSingleBookSync
} from '../../actions/Book';

jest.mock('../../helpers/Alert.js');
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
let store;

describe('Book actions', () => {
  it('should create an action to add book', () => {
    const payload = {
      success: true,
      message: 'successful'
    };
    const expectedAction = {
      type: ADD_BOOK,
      payload
    };
    expect(addBookSync(payload)).toEqual(expectedAction);
  });
  it('should create an action to edit book', () => {
    const payload = {
      success: true,
      message: 'successful'
    };
    const expectedAction = {
      type: EDIT_BOOK,
      payload
    };
    expect(editBookSync(payload)).toEqual(expectedAction);
  });
  it('should create an action to delete book', () => {
    const payload = {
      success: true,
      message: 'successful'
    };
    const expectedAction = {
      type: DELETE_BOOK,
      payload
    };
    expect(deleteBookSync(payload)).toEqual(expectedAction);
  });
  it('should create an action to get all book', () => {
    const payload = {
      success: true,
      message: 'successful'
    };
    const expectedAction = {
      type: GET_BOOKS,
      payload
    };
    expect(getBooksSync(payload)).toEqual(expectedAction);
  });
  it('should create an action to get available books', () => {
    const payload = {
      success: true,
      message: 'successful'
    };
    const expectedAction = {
      type: GET_BOOKS_AVAILABLE,
      payload
    };
    expect(getBooksAvailableSync(payload)).toEqual(expectedAction);
  });
  it('should create an action to get deleted books', () => {
    const payload = {
      success: true,
      message: 'successful'
    };
    const expectedAction = {
      type: GET_BOOKS_DELETED,
      payload
    };
    expect(getBooksDeletedSync(payload)).toEqual(expectedAction);
  });
  it('should create an action to get finished books', () => {
    const payload = {
      success: true,
      message: 'successful'
    };
    const expectedAction = {
      type: GET_BOOKS_FINISHED,
      payload
    };
    expect(getBooksFinishedSync(payload)).toEqual(expectedAction);
  });
  it('should create an action to get pending books', () => {
    const payload = {
      success: true,
      message: 'successful'
    };
    const expectedAction = {
      type: GET_PENDING_BOOKS,
      payload
    };
    expect(getPendingBooksSync(payload)).toEqual(expectedAction);
  });
  it('should create an action to get single book', () => {
    const payload = {
      success: true,
      message: 'successful'
    };
    const expectedAction = {
      type: GET_SINGLE_BOOK,
      payload
    };
    expect(getSingleBookSync(payload)).toEqual(expectedAction);
  });
});

describe('Book thunk actions', () => {
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
  const editBookId = 1;
  const bookdata = {
    name: 'testbook'
  };
  const bookId = 1;
  it('creates ADD_BOOK when dispatching add book', async (done) => {
    moxios.stubRequest(routes.addBooks, {
      status: 200,
      response: mocked
    });
    router.browserHistory = {
      push: () => {}
    };
    await store.dispatch(addBook()).then(() => {
      const actions = store.getActions();
      expect(actions[0].type).toEqual(ADD_BOOK);
    });
    done();
  });
  it('does not create ADD_BOOK when dispatching add book due to error response', async (done) => {
    moxios.stubRequest(routes.addBooks, {
      status: 400,
      response: mocked
    });
    router.browserHistory = {
      push: () => {}
    };
    await store.dispatch(addBook()).then(() => {
      const actions = store.getActions();
      expect(actions[0]).toEqual(undefined);
    });
    done();
  });
  it('creates EDIT_BOOK when dispatching edit book', async (done) => {
    moxios.stubRequest(`${routes.getBooks}/${editBookId}`, {
      status: 200,
      response: mocked
    });
    router.browserHistory = {
      push: () => {}
    };
    await store.dispatch(editBook(editBookId, bookdata)).then(() => {
      const actions = store.getActions();
      expect(actions[0].type).toEqual(EDIT_BOOK);
    });
    done();
  });
  it('does not create EDIT_BOOK when dispatching edit book due to error response', async (done) => {
    moxios.stubRequest(`${routes.getBooks}/${editBookId}`, {
      status: 400,
      response: mocked
    });
    router.browserHistory = {
      push: () => {}
    };
    await store.dispatch(editBook(editBookId, bookdata)).then(() => {
      const actions = store.getActions();
      expect(actions[0]).toEqual(undefined);
    });
    done();
  });
  it('creates DELETE_BOOK when dispatching delete book', async (done) => {
    moxios.stubRequest(`${routes.getBooks}/${bookId}`, {
      status: 200,
      response: mocked
    });
    router.browserHistory = {
      push: () => {}
    };
    await store.dispatch(deleteBook(bookId)).then(() => {
      const actions = store.getActions();
      expect(actions[0].type).toEqual(DELETE_BOOK);
    });
    done();
  });
  it('does not create DELETE_BOOK when dispatching delete book due to error response', async (
    done) => {
    moxios.stubRequest(`${routes.getBooks}/${bookId}`, {
      status: 400,
      response: mocked
    });
    router.browserHistory = {
      push: () => {}
    };
    await store.dispatch(deleteBook(bookId)).then(() => {
      const actions = store.getActions();
      expect(actions[0]).toEqual(undefined);
    });
    done();
  });
  it('creates GET_BOOKS when dispatching get books', async (done) => {
    moxios.stubRequest(routes.getBooks, {
      status: 200,
      response: [mocked]
    });
    await store.dispatch(getBooks()).then(() => {
      const actions = store.getActions();
      expect(actions[0]).toExist();
      expect(actions[0].type).toEqual(GET_BOOKS);
      expect(actions[1]).toNotExist();
    });
    done();
  });
  it('creates GET_BOOKS_AVAILABLE when dispatching get available books', async (done) => {
    moxios.stubRequest(routes.getBooksAvailable, {
      status: 200,
      response: [mocked]
    });
    await store.dispatch(getBooksAvailable()).then(() => {
      const actions = store.getActions();
      expect(actions[0]).toExist();
      expect(actions[0].type).toEqual(GET_BOOKS_AVAILABLE);
      expect(actions[1]).toNotExist();
    });
    done();
  });
  it('creates GET_BOOKS_DELETED when dispatching get deleted books', async (done) => {
    moxios.stubRequest(routes.getBooksDeleted, {
      status: 200,
      response: [mocked]
    });
    await store.dispatch(getBooksDeleted()).then(() => {
      const actions = store.getActions();
      expect(actions[0]).toExist();
      expect(actions[0].type).toEqual(GET_BOOKS_DELETED);
      expect(actions[1]).toNotExist();
    });
    done();
  });
  it('creates GET_BOOKS_FINISHED when dispatching get finished books', async (done) => {
    moxios.stubRequest(routes.getBooksFinished, {
      status: 200,
      response: [mocked]
    });
    await store.dispatch(getBooksFinished()).then(() => {
      const actions = store.getActions();
      expect(actions[0]).toExist();
      expect(actions[0].type).toEqual(GET_BOOKS_FINISHED);
      expect(actions[1]).toNotExist();
    });
    done();
  });
});
