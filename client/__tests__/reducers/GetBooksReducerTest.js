import expect from 'expect';
import {
  GET_BOOKS
} from '../../helpers/Constants';
import GetBooksReducer from '../../reducers/books/GetBooksReducer';

describe('Get Books Reducer', () => {
  it('should return initial state', () => {
    const initialState = [{
      count: 0,
      list: {}
    }];
    expect(GetBooksReducer(undefined, {})).toEqual(initialState);
  });
  it('should handle  GET_BOOKS', () => {
    const mockAction = {
      type: GET_BOOKS,
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
    expect(GetBooksReducer([], mockAction)).toEqual(expectedResult);
  });
});
