import expect from 'expect';
import {
  RETURN_BOOK
} from '../../helpers/Constants';
import ReturnBookReducer from '../../reducers/borrow/ReturnBookReducer';

describe('Retuen Book Reducer', () => {
  it('should return initial state', () => {
    const initialState = [{
      success: false,
      message: '',
      isProcessing: true,
      bookId: ''
    }];
    expect(ReturnBookReducer(undefined, {})).toEqual(initialState);
  });
  it('should handle  RETURN_BOOK', () => {
    const mockAction = {
      type: RETURN_BOOK,
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
    expect(ReturnBookReducer([], mockAction)).toEqual(expectedResult);
  });
});
