import {
  GET_CLIENT_USERS
} from '../../helpers/Constants';

const initialState = [{
  count: 0,
  list: []
}];

/**
 * GetClientUsersReducer
 *
 * @export GetClientUsersReducer
 *
 * @param {Array} state
 * @param {Object} action
 *
 * @returns {Object} State object
 */
const GetClientUsersReducer = (state = initialState, action) => {
  switch (action.type) {
  case GET_CLIENT_USERS:
    return [{
      count: action.payload.users.count,
      list: action.payload.users.rows
    }, ...state];
  default:
    return state;
  }
};

export default GetClientUsersReducer;
