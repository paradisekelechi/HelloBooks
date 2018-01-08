import expect from 'expect';
import {
  BORROW_BOOK
} from '../../helpers/Constants';
import BorrowBookReducer from '../../reducers/borrow/BorrowBookReducer';

describe('Borrow Book Reducer', () => {
  it('should return initial state', () => {
    const initialState = [{
      success: false,
      message: '',
      isProcessing: true,
      bookId: ''
    }];
    expect(BorrowBookReducer(undefined, {})).toEqual(initialState);
  });
  it('should handle  BORROW_BOOK', () => {
    const mockAction = {
      type: BORROW_BOOK,
      payload: {
        success: true,
        message: 'test successful',
        bookId: 2
      }
    };
    const expectedResult = [{
      success: true,
      message: 'test successful',
      isProcessing: false,
      bookId: 2
    }];
    expect(BorrowBookReducer([], mockAction)).toEqual(expectedResult);
  });
});
