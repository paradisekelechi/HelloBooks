import {
  GET_SINGLE_BOOK
} from '../../helpers/Constants';

const initialState = [{
  book: {},
  isLoading: false
}];

/**
 * GetSingleBookReducer
 *
 * @export GetSingleBookReducer
 *
 * @param {Array} state
 * @param {Object} action
 *
 * @returns {Object} State object
 */
const GetSingleBookReducer = (state = initialState, action) => {
  switch (action.type) {
  case GET_SINGLE_BOOK:
    return [{
      book: action.payload.book
    }, ...state];

  default:
    return state;
  }
};

export default GetSingleBookReducer;
