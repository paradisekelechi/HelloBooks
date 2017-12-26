import {
  EDIT_BOOK
} from '../../helpers/Constants';

const initialState = [{
  success: false,
  message: '',
  isProcessing: true,
  editBookId: ''
}];

const EditBookReducer = (state = initialState, action) => {
  switch (action.type) {
  case EDIT_BOOK:
    return [{
      success: action.payload.success,
      message: action.payload.message,
      isProcessing: false,
      editBookId: action.payload.editBookId
    }, ...state];

  default:
    return state;
  }
};

export default EditBookReducer;
