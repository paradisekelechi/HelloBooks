import axios from 'axios';
import querystring from 'querystring';
import {browserHistory} from 'react-router';

import {SIGNUP_USER, SIGNIN_USER} from '../constants/actionConstants';
import routes from '../../server/utils/apiRoutes';
/**
 * 
 * 
 * @export
 * @param {any} user 
 * @returns {void}
 */
export function signinUser(user) {
    const formdata = querystring.stringify({
        username: user.username,
        password: user.password
    });
    return dispatch => {
        axios.post(`${routes.signin}`, formdata)
        .then((data) => {
            return dispatch(signinUserAsync(data.data));

        })
    }
}

const signinUserAsync = (user) =>{
    return {
        type: SIGNIN_USER,
        user
    }
}

/**
 * 
 * 
 * @export
 * @param {any} user 
 * @returns {void}
 */
export function signupUser (user) {
    const formdata = querystring.stringify({
        username: user.username,
        password: user.password,
        email: user.email
    });
    return dispatch => {
        axios
        .post(`${routes.signup}`, formdata)
        .then((response) => {
            const responseData = response.data;
            if(responseData.success){
                dispatch(signupUserAsync(user));
                localStorage.setItem('user-token', responseData.token);
                browserHistory.push('/dashboard');
            }
        });
    }
}

const signupUserAsync = (user) => {
    return {
        type: SIGNUP_USER,
        user
    }
}