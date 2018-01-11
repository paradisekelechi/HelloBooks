import expect from 'expect';
import {
  GET_BOOKS_DELETED
} from '../../helpers/Constants';
import GetDeletedBooksReducer from '../../reducers/books/GetDeletedBooksReducer';

describe('Get Deleted Books Reducer', () => {
  it('should return initial state', () => {
    const initialState = [{
      count: 0,
      list: {}
    }];
    expect(GetDeletedBooksReducer(undefined, {})).toEqual(initialState);
  });
  it('should handle  GET_BOOKS', () => {
    const mockAction = {
      type: GET_BOOKS_DELETED,
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
      }]
    }];
    expect(GetDeletedBooksReducer([], mockAction)).toEqual(expectedResult);
  });
});
