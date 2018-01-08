import expect from 'expect';
import {
  GET_BOOKS_AVAILABLE
} from '../../helpers/Constants';
import AvailableBooksReducer from '../../reducers/books/AvailableBooksReducer';

describe('Get Available Books Reducer', () => {
  it('should return initial state', () => {
    const initialState = [{
      isLoading: true,
      error: '',
      count: 0,
      list: []
    }];
    expect(AvailableBooksReducer(undefined, {})).toEqual(initialState);
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
      isLoading: false,
      error: ''
    }];
    expect(AvailableBooksReducer([], mockAction)).toEqual(expectedResult);
  });
});
