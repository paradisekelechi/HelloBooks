import * as actionConstants from '../utils/actionConstants';

const initialState = {
    isLoading: true,
    error: '',
}

    export default (state = initialState, action) => {
        switch (action.type) {
            case actionConstants.EDIT_BOOK:
            case actionConstants.DELETE_BOOK:
            case actionConstants.ADD_BOOK:
                return Object.assign(
                    {},
                    state,
                    {
                        isLoading: false,
                        error: ''
                    }
                );    

          default:
            return state;
        }
    }