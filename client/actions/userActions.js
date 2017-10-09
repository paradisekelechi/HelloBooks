
/**
 * 
 * 
 * @export
 * @param {any} user 
 * @returns {void}
 */
export function signinUser(user){
    return {
        type: 'SIGNIN_USER',
        user: user
    }
}