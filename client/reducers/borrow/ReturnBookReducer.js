import * as actionConstants from '../../utils/Constants';

const initialState = [{
  success: false,
  message: '',
  isProcessing: true,
  bookId: ''
}];

const ReturnBookReducer = (state = initialState, action) => {
  switch (action.type) {
  case actionConstants.RETURN_BOOK:
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
