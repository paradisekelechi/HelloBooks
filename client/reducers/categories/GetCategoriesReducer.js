import * as actionConstants from '../../utils/Constants';

const initialState = [{
  message: '',
  list: []
}];

const GetCategoriesReducer = (state = initialState, action) => {
  switch (action.type) {
  case actionConstants.GET_BOOK_CATEGORIES:
    return [{
      message: action.payload.message,
      list: action.payload.bookcategory
    }, ...state];

  default:
    return state;
  }
};

export default GetCategoriesReducer;
