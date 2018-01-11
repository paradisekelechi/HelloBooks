import expect from 'expect';
import {
  EDIT_USER_PROFILE
} from '../../helpers/Constants';
import ProfileImageReducer from '../../reducers/profile/ProfileImageReducer';

describe('Edit Profile Image Reducer', () => {
  it('should return initial state', () => {
    const initialState = [{
      isEdited: false,
      imageUrl: ''
    }];
    expect(ProfileImageReducer(undefined, {})).toEqual(initialState);
  });
  it('should handle EDIT_USER_PROFILE', () => {
    const mockAction = {
      type: EDIT_USER_PROFILE,
      payload: {
        imageUrl: 'test url'
      }
    };
    const expectedResult = [{
      isEdited: true,
      imageUrl: 'test url'
    }];
    expect(ProfileImageReducer([], mockAction)).toEqual(expectedResult);
  });
});
