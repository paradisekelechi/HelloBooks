import expect from 'expect';
import {
  DELETE_BOOK
} from '../../helpers/Constants';
import DeleteBookReducer from '../../reducers/books/DeleteBookReducer';

describe('Delete Book Reducer', () => {
  it('should return initial state', () => {
    const initialState = [{
      success: false,
      message: ''
    }];
    expect(DeleteBookReducer(undefined, {})).toEqual(initialState);
  });
  it('should handle DELETE_BOOK', () => {
    const mockAction = {
      type: DELETE_BOOK,
      payload: {
        message: 'test message',
        success: true,
      }
    };
    const expectedResult = [{
      message: 'test message',
      success: true
    }];
    expect(DeleteBookReducer([], mockAction)).toEqual(expectedResult);
  });
});
