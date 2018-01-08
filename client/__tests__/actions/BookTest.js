import expect from 'expect';
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
  editBookSync,
  deleteBookSync,
  getBooksSync,
  getBooksAvailableSync,
  getBooksDeletedSync,
  getBooksFinishedSync,
  getPendingBooksSync,
  getSingleBookSync
} from '../../actions/Book';

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
