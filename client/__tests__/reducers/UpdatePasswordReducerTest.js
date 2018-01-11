import expect from 'expect';
import {
  UPDATE_PASSWORD
} from '../../helpers/Constants';
import UpdatePasswordReducer from '../../reducers/profile/UpdatePasswordReducer';

describe('Update Password Reducer', () => {
  it('should return initial state', () => {
    const initialState = [{
      success: false,
      message: '',
      isProcessing: true,
    }];
    expect(UpdatePasswordReducer(undefined, {})).toEqual(initialState);
  });
  it('should handle UPDATE_PASSWORD', () => {
    const mockAction = {
      type: UPDATE_PASSWORD,
      payload: {
        success: true,
        message: 'test message'
      }
    };
    const expectedResult = [{
      success: true,
      message: 'test message',
      isProcessing: false,
    }];
    expect(UpdatePasswordReducer([], mockAction)).toEqual(expectedResult);
  });
});
