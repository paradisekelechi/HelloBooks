import * as actionConstants from '../../utils/Constants';

const initialState = [{
  count: 0,
  list: []
}];

/**
 *
 *
 * @export
 * @param {any} state
 * @param {any} action
 * @returns {object} State object
 */
const GetClientUsersReducer = (state = initialState, action) => {
  switch (action.type) {
  case actionConstants.GET_CLIENT_USERS:
    return [{
      count: action.payload.users.count,
      list: action.payload.users.rows
    }, ...state];
  default:
    return state;
  }
};

export default GetClientUsersReducer;
