import {
  GET_USERTYPES
} from '../../helpers/Constants';

const initialState = [{
  message: '',
  list: [],
  count: 0
}];

const GetUsertypesReducer = (state = initialState, action) => {
  switch (action.type) {
  case GET_USERTYPES:
    return [{
      message: action.payload.message,
      list: action.payload.usertype.rows,
      count: action.payload.usertype.count
    }, ...state];

  default:
    return state;
  }
};

export default GetUsertypesReducer;
