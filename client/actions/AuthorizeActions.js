import {
  authenticateFetch
} from '../utils/authenticate';
import {
  CHECK_LOGIN_STATUS
} from '../utils/Constants';

const checkLoginSync = (data) => {
  return {
    type: CHECK_LOGIN_STATUS,
    payload: data
  };
};

const checkLogin = () => {
  const loginDetails = authenticateFetch();
  return (dispatch) => {
    dispatch(checkLoginSync(loginDetails));
  };
};

export default checkLogin;
