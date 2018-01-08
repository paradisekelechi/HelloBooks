import {
  GET_USERTYPES
} from '../../helpers/Constants';

const initialState = [{
  message: '',
  list: [],
  count: 0
}];

/**
 * GetUsertypesReducer
 *
 * @export GetUsertypesReducer
 *
 * @param {Array} state
 * @param {Object} action
 *
 * @returns {Object} State object
 */
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
