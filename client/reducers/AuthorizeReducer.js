import {
  CHECK_LOGIN_STATUS
} from '../utils/Constants';

const initialState = [{
  loggedIn: false,
  user: {},
}];

export default (state = initialState, action) => {
  switch (action.type) {
  case CHECK_LOGIN_STATUS:
    return [{
      loggedIn: action.payload.loggedIn,
      user: action.payload.userdata
    }, ...state];
  default:
    return state;
  }
};
