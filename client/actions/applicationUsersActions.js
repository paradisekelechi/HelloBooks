import axios from 'axios';
import querystring from 'querystring';
import {browserHistory} from 'react-router';

import {GET_ALL_USERS, GET_ADMIN_USERS} from '../utils/actionConstants';
import routes from '../utils/apiRoutes';
import {authenticatePersist, authenticateClear} from '../utils/authenticate';

/**
 * @export
 * @param {any} users 
 * @returns {object} object
 */
export function getUsers (users){
    return dispatch => {
        axios
        .get()
        .then((response) => {
            if(response){
                dispatch(getUsersSync());
            }
        });
    }
}

const getUsersSync = (users) => {
    return {
        type: GET_ALL_USERS,
        users
    }
}


/**
 * 
 * @export
 * @param {any} users 
 * @returns {void} Dispatch object
 */
export function getAdminUsers (users){
    return dispatch => {
        axios
        .get()
        .then((response) => {
            if(response){
                dispatch(getUsersSync());
            }
        });
    }
}
