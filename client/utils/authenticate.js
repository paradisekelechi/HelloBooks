//import jwt from 'jsonwebtoken';
import jwt_decode from 'jwt-decode';

/**
 * 
 * @returns {void} description
 * @export
 * @param {any} usertoken 
 */
export function authenticatePersist (usertoken){
    localStorage.setItem('userdata', JSON.stringify({
        token: usertoken
    }));
}

/**
 * 
 * 
 * @export
 * @returns {object} Userdata object 
 */
export function authenticateFetch(){
    const storageData =JSON.parse(localStorage.getItem('userdata'));
    const token = storageData.token;
    const userData = jwt_decode(storageData.token);
    return {
        loggedIn: true,
        userdata: userData,
        token: token
    }
}

/**
 * 
 * @returns {void} description
 * @export
 */
export function authenticateClear(){
    console.log('clearing local storage');
    localStorage.removeItem('userdata');
}