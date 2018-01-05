import {
  UPDATE_PASSWORD
} from '../../helpers/Constants';

const initialState = [{
  success: false,
  message: '',
  isProcessing: true,
}];

const UpdatePasswordReducer = (state = initialState, action) => {
  switch (action.type) {
  case UPDATE_PASSWORD:
    return [{
      success: action.payload.success,
      message: action.payload.message,
      isProcessing: false,
    }, ...state];

  default:
    return state;
  }
};

export default UpdatePasswordReducer;
