import {SIGNIN_USER, SIGNUP_USER} from '../constants/actionConstants';

/**
 * 
 * 
 * @export
 * @param {any} state 
 * @param {any} action 
 * @returns {object} State object
 */
export default function userReducer(state = [], action){
    switch (action.type) {
        case SIGNIN_USER:
            return [...state, action.user
            ];
        case SIGNUP_USER:
            return [...state, action.user];
        default:
            return state;
    }
}
