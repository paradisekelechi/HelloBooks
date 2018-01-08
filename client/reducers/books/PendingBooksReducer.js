import {
  GET_PENDING_BOOKS
} from '../../helpers/Constants';

const initialState = [{
  list: [],
  isLoading: true
}];

/**
 * PendingBooksReducer
 *
 * @export PendingBooksReducer
 *
 * @param {Array} state
 * @param {Object} action
 *
 * @returns {Object} State object
 */
const PendingBooksReducer = (state = initialState, action) => {
  switch (action.type) {
  case GET_PENDING_BOOKS:
    return [{
      list: action.payload.booklog,
      isLoading: false
    }, ...state];

  default:
    return state;
  }
};

export default PendingBooksReducer;
