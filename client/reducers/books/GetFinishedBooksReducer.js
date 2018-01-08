import {
  GET_BOOKS_FINISHED
} from '../../helpers/Constants';

const initialState = [{
  count: 0,
  list: {}
}];

/**
 * GetFinishedBooksReducer
 *
 * @export GetFinishedBooksReducer
 *
 * @param {Array} state
 * @param {Object} action
 *
 * @returns {Object} State object
 */
const GetFinishedBooksReducer = (state = initialState, action) => {
  switch (action.type) {
  case GET_BOOKS_FINISHED:
    return [{
      count: action.payload.book.count,
      list: action.payload.book.rows
    }, ...state];

  default:
    return state;
  }
};

export default GetFinishedBooksReducer;
