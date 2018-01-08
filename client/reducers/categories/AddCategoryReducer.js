import {
  ADD_CATEGORY
} from '../../helpers/Constants';

const initialState = [{
  success: false,
  message: '',
  isProcessing: true,
}];
/**
 * AddCategoryReducer
 *
 * @export AddCategoryReducer
 *
 * @param {Array} state
 * @param {Object} action
 *
 * @returns {Object} State object
 */
const AddCategoryReducer = (state = initialState, action) => {
  switch (action.type) {
  case ADD_CATEGORY:
    return [{
      success: action.payload.success,
      message: action.payload.message,
      isProcessing: false,
    }, ...state];

  default:
    return state;
  }
};

export default AddCategoryReducer;
