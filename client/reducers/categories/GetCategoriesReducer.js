import {
  GET_BOOK_CATEGORIES
} from '../../helpers/Constants';

const initialState = [{
  message: '',
  list: []
}];

const GetCategoriesReducer = (state = initialState, action) => {
  switch (action.type) {
  case GET_BOOK_CATEGORIES:
    return [{
      message: action.payload.message,
      list: action.payload.bookcategory
    }, ...state];

  default:
    return state;
  }
};

export default GetCategoriesReducer;
