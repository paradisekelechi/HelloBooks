import expect from 'expect';
import {
  GET_BOOKS_AVAILABLE
} from '../../helpers/Constants';
import GetAvailableBooksReducer from '../../reducers/books/GetAvailableBooksReducer';

describe('Get Available Books Reducer', () => {
  it('should return initial state', () => {
    const initialState = [{
      isLoading: true,
      count: 0,
      list: {}
    }];
    expect(GetAvailableBooksReducer(undefined, {})).toEqual(initialState);
  });
  it('should handle  GET_BOOKS_AVAILABLE', () => {
    const mockAction = {
      type: GET_BOOKS_AVAILABLE,
      payload: {
        book: {
          rows: [{
            name: 'Test book'
          }],
          count: 1
        }
      }
    };
    const expectedResult = [{
      count: 1,
      list: [{
        name: 'Test book'
      }],
      isLoading: false
    }];
    expect(GetAvailableBooksReducer([], mockAction)).toEqual(expectedResult);
  });
});
