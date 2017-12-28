import {
  BORROW_BOOK
} from '../../helpers/Constants';

const initialState = [{
  success: false,
  message: '',
  isProcessing: true,
  bookId: ''
}];

const BorrowBookReducer = (state = initialState, action) => {
  switch (action.type) {
  case BORROW_BOOK:
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

export default BorrowBookReducer;
