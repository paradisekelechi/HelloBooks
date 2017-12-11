import * as actionConstants from '../../utils/Constants';

const initialState = [{
  isLoading: true,
  error: '',
  count: 0,
  list: []
}];

const AvailableBooksReducer = (state = initialState, action) => {
  switch (action.type) {
  case actionConstants.GET_BOOKS_AVAILABLE:
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
