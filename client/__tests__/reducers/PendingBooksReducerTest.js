import expect from 'expect';
import {
  GET_PENDING_BOOKS
} from '../../helpers/Constants';
import PendingBooksReducer from '../../reducers/books/PendingBooksReducer';

describe('Get Books Reducer', () => {
  it('should return initial state', () => {
    const initialState = [{
      list: [],
      isLoading: true
    }];
    expect(PendingBooksReducer(undefined, {})).toEqual(initialState);
  });
  it('should handle  GET_PENDING_BOOKS', () => {
    const mockAction = {
      type: GET_PENDING_BOOKS,
      payload: {
        booklog: [{
          name: 'test book'
        }]
      }
    };
    const expectedResult = [{
      isLoading: false,
      list: [{
        name: 'test book'
      }]
    }];
    expect(PendingBooksReducer([], mockAction)).toEqual(expectedResult);
  });
});
