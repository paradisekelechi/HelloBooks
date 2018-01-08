import {
  GET_BOOK_CATEGORIES
} from '../../helpers/Constants';

const initialState = [{
  message: '',
  list: [],
  count: 0,
  isLoading: true
}];

/**
 * GetCategoriesReducer
 *
 * @export GetCategoriesReducer
 *
 * @param {Array} state
 * @param {Object} action
 *
 * @returns {Object} State object
 */
const GetCategoriesReducer = (state = initialState, action) => {
  switch (action.type) {
  case GET_BOOK_CATEGORIES:
    return [{
      message: action.payload.message,
      list: action.payload.bookcategory.rows,
      count: action.payload.bookcategory.count,
      isLoading: false
    }, ...state];

  default:
    return state;
  }
};

export default GetCategoriesReducer;
