import axios from 'axios';
import {GET_BOOKS} from '../utils/actionConstants';
import routes from '../utils/apiRoutes';

/**
 * @export
 * @param {any} data 
 * @returns {void} 
 */
export function getBooksCount (data){
    const config = {
        headers: {
            'user-token': ''
        }
    }
    return dispatch => {
        axios.
        post(routes.getBooksCount, config)
        .then(books => {
            console.log(books);
        })
    }
}

const getBooksCountSync = (data) => {
    return {
        type: GET_BOOKS,
        data
    }
}