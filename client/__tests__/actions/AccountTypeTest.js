import expect from 'expect';
import {
  GET_ACCOUNTTYPES
} from '../../helpers/Constants';
import {
  getAccountTypesSync
} from '../../actions/AccountType';

describe('AccountType actions', () => {
  it('should create an action to get account types', () => {
    const payload = {
      success: true,
      message: 'successful'
    };
    const expectedAction = {
      type: GET_ACCOUNTTYPES,
      payload
    };

    expect(getAccountTypesSync(payload)).toEqual(expectedAction);
  });
});
