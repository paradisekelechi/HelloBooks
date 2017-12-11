import * as actionConstants from '../utils/Constants';

const initialState = {
  total: {
    isLoading: true,
    error: '',
    count: 0,
    list: {}
  },
  deleted: {
    isLoading: true,
    error: '',
    count: 0,
    list: {}
  },
  finished: {
    isLoading: true,
    error: '',
    count: 0,
    list: {}
  },
  available: {
    isLoading: true,
    error: '',
    count: 0,
    list: {}
  },
};

const BookListReducer = (state = initialState, action) => {
  switch (action.type) {
  case actionConstants.GET_BOOKS_DELETED:
    return Object.assign(
      {},
      state, {
        deleted: {
          isLoading: false,
          error: '',
          count: action.payload.book.count,
          list: action.payload.book.rows
        }
      }
    );
  case actionConstants.GET_BOOKS:
    return Object.assign(
      {},
      state, {
        total: {
          isLoading: false,
          error: '',
          count: action.payload.book.count,
          list: action.payload.book.rows
        }
      }
    );
  case actionConstants.GET_BOOKS_FINISHED:
    return Object.assign(
      {},
      state, {
        finished: {
          isLoading: false,
          error: '',
          count: action.payload.book.count,
          list: action.payload.book.rows
        }
      }
    );

  default:
    return state;
  }
};

export default BookListReducer;
