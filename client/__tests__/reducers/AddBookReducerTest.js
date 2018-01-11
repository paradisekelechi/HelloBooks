import expect from 'expect';
import {
  ADD_BOOK
} from '../../helpers/Constants';
import AddBookReducer from '../../reducers/books/AddBookReducer';

describe('Add Book Reducer', () => {
  it('should return initial state', () => {
    const initialState = [{
      success: false,
      message: '',
      isProcessing: true,
    }];
    expect(AddBookReducer(undefined, {})).toEqual(initialState);
  });
  it('should handle ADD_BOOK', () => {
    const mockAction = {
      type: ADD_BOOK,
      payload: {
        message: 'test message',
        success: true,
      }
    };
    const expectedResult = [{
      message: 'test message',
      success: true,
      isProcessing: false
    }];
    expect(AddBookReducer([], mockAction)).toEqual(expectedResult);
  });
});
