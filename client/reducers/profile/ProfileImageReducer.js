import {
  EDIT_USER_PROFILE
} from '../../utils/Constants';


const initialState = [{
  isEdited: false,
  imageUrl: ''
}];

const profileImageReducer = (state = initialState, action) => {
  switch (action) {
  case EDIT_USER_PROFILE:
    return [{
      isEdited: true,
      imageUrl: action.payload.imageUrl
    }, ...state];
  default:
    return state;
  }
};

export default profileImageReducer;
