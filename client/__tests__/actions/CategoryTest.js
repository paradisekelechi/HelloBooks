import expect from 'expect';
import {
  GET_BOOK_CATEGORIES,
  ADD_CATEGORY
} from '../../helpers/Constants';
import {
  getCategoriesSync,
  addCategorySync
} from '../../actions/Category';


describe('Category actions', () => {
  it('should create an action to gets book categories', () => {
    const payload = {
      success: true,
      message: 'successful'
    };
    const expectedAction = {
      type: GET_BOOK_CATEGORIES,
      payload
    };
    expect(getCategoriesSync(payload)).toEqual(expectedAction);
  });
  it('should create an action to adds book category', () => {
    const payload = {
      success: true,
      message: 'successful'
    };
    const expectedAction = {
      type: ADD_CATEGORY,
      payload
    };
    expect(addCategorySync(payload)).toEqual(expectedAction);
  });
});
