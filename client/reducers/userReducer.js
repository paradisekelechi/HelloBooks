
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
        case 'SIGNIN_USER':
            return [...state,
                Object.assign({}, action.user)
            ];
        default:
            return state;
    }
}