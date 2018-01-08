import {
  GET_BOOKS_AVAILABLE
} from '../../helpers/Constants';

const initialState = [{
  isLoading: true,
  error: '',
  count: 0,
  list: []
}];

/**
 * AvailableBooksReducer
 *
 * @export AvailableBooksReducer
 *
 * @param {Array} state
 * @param {Object} action
 *
 * @returns {Object} State object
 */
const AvailableBooksReducer = (state = initialState, action) => {
  switch (action.type) {
  case GET_BOOKS_AVAILABLE:
    return [{
      isLoading: false,
      error: '',
      count: action.payload.book.count,
      list: action.payload.book.rows
    }, ...state];

  default:
    return state;
  }
};

export default AvailableBooksReducer;
