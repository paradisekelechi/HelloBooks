import * as actionConstants from '../utils/Constants';

const initialState = {
  isLoading: true,
  error: 'Action is still loading',
  isSuccessful: false
};

export default (state = initialState, action) => {
  switch (action.type) {
  case actionConstants.EDIT_BOOK:
  case actionConstants.DELETE_BOOK:
  case actionConstants.ADD_BOOK:
    return Object.assign(
      {},
      state, {
        isLoading: false,
        error: '',
        isSuccessful: true
      }
    );

  default:
    return state;
  }
};
