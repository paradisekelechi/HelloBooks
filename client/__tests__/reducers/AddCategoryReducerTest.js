import expect from 'expect';
import {
  ADD_CATEGORY
} from '../../helpers/Constants';
import AddCategoryReducer from '../../reducers/categories/AddCategoryReducer';

describe('Add Book Category Reducer', () => {
  it('should return initial state', () => {
    const initialState = [{
      success: false,
      message: '',
      isProcessing: true,
    }];
    expect(AddCategoryReducer(undefined, {})).toEqual(initialState);
  });
  it('should handle ADD_CATEGORY', () => {
    const mockAction = {
      type: ADD_CATEGORY,
      payload: {
        message: 'test message',
        success: true,
      }
    };
    const expectedResult = [{
      message: 'test message',
      success: true,
      isProcessing: false
    }];
    expect(AddCategoryReducer([], mockAction)).toEqual(expectedResult);
  });
});
