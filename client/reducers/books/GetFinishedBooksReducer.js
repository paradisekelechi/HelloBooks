import {
  GET_BOOKS_FINISHED
} from '../../helpers/Constants';

const initialState = [{
  count: 0,
  list: {}
}];

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
