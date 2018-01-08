import {
  ADD_BOOK
} from '../../helpers/Constants';

const initialState = [{
  success: false,
  message: '',
  isProcessing: true,
}];

/**
 * AddBookReducer
 *
 * @export AddBookReducer
 *
 * @param {Array} state
 * @param {Object} action
 *
 * @returns {Object} State object
 */
const AddBookReducer = (state = initialState, action) => {
  switch (action.type) {
  case ADD_BOOK:
    return [{
      success: action.payload.success,
      message: action.payload.message,
      isProcessing: false,
    }, ...state];

  default:
    return state;
  }
};

export default AddBookReducer;
