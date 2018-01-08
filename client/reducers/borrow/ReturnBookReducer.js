import {
  RETURN_BOOK
} from '../../helpers/Constants';

const initialState = [{
  success: false,
  message: '',
  isProcessing: true,
  bookId: ''
}];

/**
 * ReturnBookReducer
 *
 * @export ReturnBookReducer
 *
 * @param {Array} state
 * @param {Object} action
 *
 * @returns {Object} State object
 */
const ReturnBookReducer = (state = initialState, action) => {
  switch (action.type) {
  case RETURN_BOOK:
    return [{
      success: action.payload.success,
      message: action.payload.message,
      isProcessing: false,
      bookId: action.payload.bookId
    }, ...state];

  default:
    return state;
  }
};

export default ReturnBookReducer;
