import expect from 'expect';
import {
  GET_BOOKS_FINISHED
} from '../../helpers/Constants';
import GetFinishedBooksReducer from '../../reducers/books/GetFinishedBooksReducer';

describe('Get Finished Books Reducer', () => {
  it('should return initial state', () => {
    const initialState = [{
      count: 0,
      list: {}
    }];
    expect(GetFinishedBooksReducer(undefined, {})).toEqual(initialState);
  });
  it('should handle  GET_BOOKS_FINISHED', () => {
    const mockAction = {
      type: GET_BOOKS_FINISHED,
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
    expect(GetFinishedBooksReducer([], mockAction)).toEqual(expectedResult);
  });
});
