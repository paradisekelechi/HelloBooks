import {
  EDIT_BOOK
} from '../../helpers/Constants';

const initialState = [{
  success: false,
  message: '',
  isProcessing: true,
  editBookId: ''
}];

/**
 * EditBookReducer
 *
 * @export EditBookReducer
 *
 * @param {Array} state
 * @param {Object} action
 *
 * @returns {Object} State object
 */
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
