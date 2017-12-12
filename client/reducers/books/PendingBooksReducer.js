import * as actionConstants from '../../utils/Constants';

const initialState = [{
  list: []
}];

const PendingBooksReducer = (state = initialState, action) => {
  switch (action.type) {
  case actionConstants.GET_PENDING_BOOKS:
    return [{
      list: action.payload.booklog
    }, ...state];

  default:
    return state;
  }
};

export default PendingBooksReducer;
