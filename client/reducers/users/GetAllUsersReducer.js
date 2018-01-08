import {
  GET_ALL_USERS
} from '../../helpers/Constants';

const initialState = [{
  count: 0,
  list: [],
  isLoading: true
}];

/**
 * GetAllUsersReducer
 *
 * @export GetAllUsersReducer
 *
 * @param {Array} state
 * @param {Object} action
 *
 * @returns {Object} State object
 */
const GetAllUsersReducer = (state = initialState, action) => {
  switch (action.type) {
  case GET_ALL_USERS:
    return [{
      count: action.payload.users.count,
      list: action.payload.users.rows,
      isLoading: false
    }, ...state];
  default:
    return state;
  }
};

export default GetAllUsersReducer;
