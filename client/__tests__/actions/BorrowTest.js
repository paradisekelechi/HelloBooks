import expect from 'expect';
import {
  BORROW_BOOK,
  RETURN_BOOK
} from '../../helpers/Constants';
import {
  borrowBookSync,
  returnBookSync
} from '../../actions/Borrow';

describe('Borrow actions', () => {
  it('should create an action to borrow a book', () => {
    const payload = {
      success: true,
      message: 'successful'
    };
    const expectedAction = {
      type: BORROW_BOOK,
      payload
    };
    expect(borrowBookSync(payload)).toEqual(expectedAction);
  });
  it('should create an action to return a book', () => {
    const payload = {
      success: true,
      message: 'successful'
    };
    const expectedAction = {
      type: RETURN_BOOK,
      payload
    };
    expect(returnBookSync(payload)).toEqual(expectedAction);
  });
});
