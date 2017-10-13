import * as actionConstants from '../utils/actionConstants';

const initialState = {
    total: {
        isLoading: true,
        error: '',
        count: 0,
        list: {}
    },
    admin: {
        isLoading: true,
        error: '',
        count: 0,
        list: {}
    },
    client: {
        isLoading: true,
        error: '',
        count: 0,
        list: {}
    },
    deleted: {
        isLoading: true,
        error: '',
        count: 0,
        list: {}
    },
}

/**
 * 
 * 
 * @export
 * @param {any} state 
 * @param {any} action 
 * @returns {object} State object
 */
const userReducer = (state = initialState, action) => {
    switch (action.type) {
        default:
            return state;
    }
}

export default userReducer;