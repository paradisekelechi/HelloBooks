import * as actionConstants from '../utils/Constants';

const initialState = {
  total: {
    isLoading: true,
    error: '',
    count: 0,
    list: {}
  },
  admin: {
    isLoading: true,
    error: '',
    count: 0,
    list: {}
  },
  client: {
    isLoading: true,
    error: '',
    count: 0,
    list: {}
  },
  deleted: {
    isLoading: true,
    error: '',
    count: 0,
    list: {}
  },
};

/**
 *
 *
 * @export
 * @param {any} state
 * @param {any} action
 * @returns {object} State object
 */
const userReducer = (state = initialState, action) => {
  switch (action.type) {
  case actionConstants.GET_ALL_USERS:
    return Object.assign(
      {},
      state, {
        total: {
          isLoading: false,
          error: '',
          count: action.payload.users.count,
          list: action.payload.users.rows
        }
      }
    );
  case actionConstants.GET_ADMIN_USERS:
    return Object.assign(
      {},
      state, {
        admin: {
          isLoading: false,
          error: '',
          count: action.payload.users.count,
          list: action.payload.users.rows
        }
      }
    );
  case actionConstants.GET_CLIENT_USERS:
    return Object.assign(
      {},
      state, {
        client: {
          isLoading: false,
          error: '',
          count: action.payload.users.count,
          list: action.payload.users.rows
        }
      }
    );
  case actionConstants.GET_DELETED_USERS:
    return Object.assign(
      {},
      state, {
        deleted: {
          isLoading: false,
          error: '',
          count: action.payload.users.count,
          list: action.payload.users.rows
        }
      }
    );
  default:
    return state;
  }
};

export default userReducer;
