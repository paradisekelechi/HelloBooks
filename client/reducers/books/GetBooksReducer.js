import {
  GET_BOOKS
} from '../../helpers/Constants';

const initialState = [{
  count: 0,
  list: {}
}];

/**
 * GetBooksReducer
 *
 * @export GetBooksReducer
 *
 * @param {Array} state
 * @param {Object} action
 *
 * @returns {Object} State object
 */
const GetBooksReducer = (state = initialState, action) => {
  switch (action.type) {
  case GET_BOOKS:
    return [{
      count: action.payload.book.count,
      list: action.payload.book.rows
    }, ...state];

  default:
    return state;
  }
};

export default GetBooksReducer;
