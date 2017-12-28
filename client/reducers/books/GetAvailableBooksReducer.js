import {
  GET_BOOKS_AVAILABLE
} from '../../helpers/Constants';

const initialState = [{
  isLoading: true,
  count: 0,
  list: {}
}];

const GetAvailableBooksReducer = (state = initialState, action) => {
  switch (action.type) {
  case GET_BOOKS_AVAILABLE:
    return [{
      isLoading: false,
      count: action.payload.book.count,
      list: action.payload.book.rows
    }, ...state];

  default:
    return state;
  }
};

export default GetAvailableBooksReducer;
