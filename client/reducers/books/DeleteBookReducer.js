import {
  DELETE_BOOK
} from '../../helpers/Constants';

const initialState = [{
  success: false,
  message: ''
}];

/**
 * DeleteBookReducer
 *
 * @export DeleteBookReducer
 *
 * @param {Array} state
 * @param {Object} action
 *
 * @returns {Object} State object
 */
const DeleteBookReducer = (state = initialState, action) => {
  switch (action.type) {
  case DELETE_BOOK:
    return [{
      success: action.payload.success,
      message: action.payload.message
    }, ...state];

  default:
    return state;
  }
};

export default DeleteBookReducer;
