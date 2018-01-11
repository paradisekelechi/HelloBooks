import expect from 'expect';
import {
  GET_BOOK_CATEGORIES
} from '../../helpers/Constants';
import GetCategoriesReducer from '../../reducers/categories/GetCategoriesReducer';

describe('Add Book Category Reducer', () => {
  it('should return initial state', () => {
    const initialState = [{
      message: '',
      list: [],
      count: 0,
      isLoading: true
    }];
    expect(GetCategoriesReducer(undefined, {})).toEqual(initialState);
  });
  it('should handle GET_BOOK_CATEGORIES', () => {
    const mockAction = {
      type: GET_BOOK_CATEGORIES,
      payload: {
        bookcategory: {
          rows: [{
            name: 'OTHERS'
          }],
          count: 1
        },
        message: 'Successfully loaded',
        success: true
      }
    };
    const expectedResult = [{
      message: 'Successfully loaded',
      list: [{
        name: 'OTHERS'
      }],
      count: 1,
      isLoading: false
    }];
    expect(GetCategoriesReducer([], mockAction)).toEqual(expectedResult);
  });
});
