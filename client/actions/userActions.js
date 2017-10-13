import axios from 'axios';
import querystring from 'querystring';
import {browserHistory} from 'react-router';

import {SIGNUP_USER, SIGNIN_USER, LOGOUT_USER} from '../utils/actionConstants';
import routes from '../utils/apiRoutes';
import {authenticatePersist, authenticateClear} from '../utils/authenticate';

/**
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
        .then((response) => {
            const responseData = response.data;
            authenticatePersist(responseData.token);
            dispatch(signinUserAsync(responseData));
            browserHistory.push('/dashboard');
        })
    }
}

const signinUserAsync = (data) =>{
    return {
        type: SIGNIN_USER,
        payload: data
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
                authenticatePersist(responseData.token);
                dispatch(signupUserAsync(response.data));
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

/**
 * 
 * 
 * @export
 * @param {any} user 
 * @returns {Object} logout dispatch
 */
export function logoutUser (user) {
    return (dispatch) => {
        authenticateClear();
        dispatch(logoutUserAsync(user));
        browserHistory.push('/signin');
    }
}

const logoutUserAsync = (user) => {
    return {
        type: LOGOUT_USER,
        user
    }
}