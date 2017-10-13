import axios from 'axios';
import querystring from 'querystring';
import {browserHistory} from 'react-router';

import * as userActions from '../utils/actionConstants';
import routes from '../utils/apiRoutes';
import {authenticateFetch, authenticatePersist, authenticateClear} from '../utils/authenticate';

const token = authenticateFetch().token;

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
        type: userActions.SIGNIN_USER,
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
        type: userActions.SIGNUP_USER,
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
        type: userActions.LOGOUT_USER,
        user
    }
}

export function getAllUsers () {
    const config = {
        headers: {
            'user-token': token
        }
    }
    return dispatch => {
        axios
        .get(routes.getAllUsers, config)
        .then((response) => {
            console.log(response);
            if(response.data.success){
                dispatch(getAllUsersSync(response.data));
            }
        })
    }
}

const getAllUsersSync = (payload) => {
    return {
        type: userActions.GET_ALL_USERS,
        payload
    }
}

export function getAdminUsers () {
    const config = {
        headers: {
            'user-token': token
        }
    }
    return dispatch => {
        axios
        .get(routes.getAdminUsers, config)
        .then((response) => {
            if(response.data.success){
                dispatch(getAdminUsersSync(response.data));
            }
        })
    }
}

const getAdminUsersSync = (payload) => {
    return {
        type: userActions.GET_ADMIN_USERS,
        payload
    }
}

export function getClientUsers () {
    const config = {
        headers: {
            'user-token': token
        }
    }
    return dispatch => {
        axios
        .get(routes.getClientUsers, config)
        .then((response) => {
            if(response.data.success){
                dispatch(getClientUsersSync(response.data));
            }
        })
    }
}

const getClientUsersSync = (payload) => {
    return {
        type: userActions.GET_CLIENT_USERS,
        payload
    }
}

export function getDeletedUsers () {
    const config = {
        headers: {
            'user-token': token
        }
    }
    return dispatch => {
        axios
        .get(routes.getDeletedUsers, config)
        .then((response) => {
            if(response.data.success){
                dispatch(getDeletedUsersSync(response.data));
            }
        })
    }
}

const getDeletedUsersSync = (payload) => {
    return {
        type: userActions.GET_DELETED_USERS,
        payload
    }
}