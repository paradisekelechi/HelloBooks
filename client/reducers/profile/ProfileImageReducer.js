import {
  EDIT_USER_PROFILE
} from '../../helpers/Constants';


const initialState = [{
  isEdited: false,
  imageUrl: ''
}];

/**
 * ProfileImageReducer
 *
 * @export ProfileImageReducer
 *
 * @param {Array} state
 * @param {Object} action
 *
 * @returns {Object} State object
 */
const ProfileImageReducer = (state = initialState, action) => {
  switch (action.type) {
  case EDIT_USER_PROFILE:
    return [{
      isEdited: true,
      imageUrl: action.payload.imageUrl
    }, ...state];
  default:
    return state;
  }
};

export default ProfileImageReducer;
