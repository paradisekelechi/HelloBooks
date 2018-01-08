import expect from 'expect';
import {
  EDIT_BOOK,
} from '../../helpers/Constants';
import EditBookReducer from '../../reducers/books/EditBookReducer';

describe('Edit Book Reducer', () => {
  it('should return initial state', () => {
    const initialState = [{
      success: false,
      message: '',
      isProcessing: true,
      editBookId: ''
    }];
    expect(EditBookReducer(undefined, {})).toEqual(initialState);
  });
  it('should handle EDIT_BOOK', () => {
    const mockAction = {
      type: EDIT_BOOK,
      payload: {
        message: 'test message',
        success: true,
        editBookId: 1
      }
    };
    const expectedResult = [{
      message: 'test message',
      success: true,
      isProcessing: false,
      editBookId: 1
    }];
    expect(EditBookReducer([], mockAction)).toEqual(expectedResult);
  });
});
