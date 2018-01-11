import expect from 'expect';
import {
  GET_SINGLE_BOOK
} from '../../helpers/Constants';
import GetSingleBookReducer from '../../reducers/books/GetSingleBookReducer';

describe('Get Single Book Reducer', () => {
  it('should return initial state', () => {
    const initialState = [{
      book: {},
      isLoading: false
    }];
    expect(GetSingleBookReducer(undefined, {})).toEqual(initialState);
  });
  it('should handle  GET_SINGLE_BOOK', () => {
    const mockAction = {
      type: GET_SINGLE_BOOK,
      payload: {
        book: {
          name: 'Test book'
        }
      }
    };
    const expectedResult = [{
      book: {
        name: 'Test book'
      }
    }];
    expect(GetSingleBookReducer([], mockAction)).toEqual(expectedResult);
  });
});
