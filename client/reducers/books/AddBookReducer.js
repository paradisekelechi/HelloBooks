import {
  ADD_BOOK
} from '../../utils/Constants';

const initialState = [{
  success: false,
  message: '',
  isProcessing: true,
  addBookId: ''
}];

const AddBookReducer = (state = initialState, action) => {
  switch (action.type) {
  case ADD_BOOK:
    return [{
      success: action.payload.success,
      message: action.payload.message,
      isProcessing: false,
      addBookId: action.payload.editBookId
    }, ...state];

  default:
    return state;
  }
};

export default AddBookReducer;
