import {
  GET_BOOKS_DELETED
} from '../../helpers/Constants';

const initialState = [{
  count: 0,
  list: {}
}];

/**
 * GetDeletedBooksReducer
 *
 * @export GetDeletedBooksReducer
 *
 * @param {Array} state
 * @param {Object} action
 *
 * @returns {Object} State object
 */
const GetDeletedBooksReducer = (state = initialState, action) => {
  switch (action.type) {
  case GET_BOOKS_DELETED:
    return [{
      count: action.payload.book.count,
      list: action.payload.book.rows
    }, ...state];

  default:
    return state;
  }
};

export default GetDeletedBooksReducer;
