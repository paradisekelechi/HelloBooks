import * as actionConstants from '../../utils/Constants';

const initialState = [{
  book: {}
}];

const GetSingleBookReducer = (state = initialState, action) => {
  switch (action.type) {
  case actionConstants.GET_SINGLE_BOOK:
    return [{
      book: action.payload.book
    }, ...state];

  default:
    return state;
  }
};

export default GetSingleBookReducer;
