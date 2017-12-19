import * as actionConstants from '../../utils/Constants';

const initialState = [{
  count: 0,
  list: {}
}];

const GetBooksReducer = (state = initialState, action) => {
  switch (action.type) {
  case actionConstants.GET_BOOKS:
    return [{
      count: action.payload.book.count,
      list: action.payload.book.rows
    }, ...state];

  default:
    return state;
  }
};

export default GetBooksReducer;
