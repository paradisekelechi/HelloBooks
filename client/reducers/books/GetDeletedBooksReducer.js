import {
  GET_BOOKS_DELETED
} from '../../helpers/Constants';

const initialState = [{
  count: 0,
  list: {}
}];

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
