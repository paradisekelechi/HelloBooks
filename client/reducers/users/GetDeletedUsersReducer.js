import {
  GET_DELETED_USERS
} from '../../helpers/Constants';

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
const GetDeletedUsersReducer = (state = initialState, action) => {
  switch (action.type) {
  case GET_DELETED_USERS:
    return [{
      count: action.payload.users.count,
      list: action.payload.users.rows
    }, ...state];
  default:
    return state;
  }
};

export default GetDeletedUsersReducer;
