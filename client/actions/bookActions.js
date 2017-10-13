import querystring from 'querystring';
import axios from 'axios';
import {ADD_BOOK, EDIT_BOOK, DELETE_BOOK, GET_BOOKS, GET_BOOKS_BORROWED, GET_BOOKS_UNRETURNED} from '../utils/actionConstants';
import {authenticateFetch} from '../utils/authenticate';
import routes from '../utils/apiRoutes';

const token = authenticateFetch().token;

/**
 * @export
 * @param {any} bookDetails 
 * @returns {object} addBook object and dispatch
 */
export function addBook (bookDetails) {
    
    const postData = querystring.stringify({
        name: bookDetails.name,
        author: bookDetails.author,
        category: bookDetails.category
    });
    const config = {
        headers: {
            'user-token': token
        }
    }
    return dispatch => {
        axios.
        post(routes.addBooks, postData, config)
        .then((response) => {
            if(response){
                dispatch(addBookSync(response.data));
            }
        })
    }
}

const addBookSync =  (bookDetails) => {
    return {
        type: ADD_BOOK,
        bookDetails
    }
}

/**
 * 
 * 
 * @export
 * @param {any} bookDetails 
 * @returns {Object} book object
 */
export function editBook(bookDetails){
    return dispatch => {
        axios
        .put()
        .then((response) => {
            if(response){
                dispatch(editBookSync(response.data))
            }
        });
    }
}

const editBookSync = (bookDetails) => {
    return {
        type: EDIT_BOOK,
        bookDetails
    }
}

/**
 * 
 * 
 * @export
 * @returns {object} delete response object
 */
export function deleteBook (){

    const config = {
        headers: {
            'user-token': token
        }
    }
    return dispatch => {
        axios
        .delete()
        .then((response) => {
            if (response){
                dispatch(deleteBookSync());
            }
        });
    }
}

const deleteBookSync = () => {
    return{
        type: DELETE_BOOK
    }
}

/**
 * 
 * 
 * @export
 * @param {any} books 
 * @returns {object} dispatch object
 */
export function getBooks () {

    const config = {
        headers: {
            'user-token': token
        }
    }
    return dispatch => {
        axios
        .get(routes.getBooks, config)
        .then((response) => {
            if(response.data.success){
                dispatch(getBooksSync(response.data));
            }
        })
    }
}

const getBooksSync = (payload) => {
    return{
        type: GET_BOOKS,
        payload
    }
}

/**
 * 
 * 
 * @export
 * @returns {type} book dispatch
 */
export function getBooksBorrowed () {

    const config = {
        headers: {
            'user-token': token
        }
    }
    return dispatch => {
        axios
        .get(routes.getBooksBorrowed, config)
        .then((response) => {
            if(response.data.success){
                dispatch(getBooksBorrowedSync(response.data));
            }
        })
    }
}
    

const getBooksBorrowedSync = (payload) => {
    return{
        type: GET_BOOKS_BORROWED,
        payload
    }
}

/**
 * 
 * 
 * @export
 * @returns {type} book dispatch
 */
export function getBooksUnreturned () {
    
    const config = {
        headers: {
            'user-token': token
        }
    }
    return dispatch => {
        axios
        .get(routes.getBooksUnreturned, config)
        .then((response) => {
            if(response.data.success){
                dispatch(getBooksUnreturnedSync(response.data));
            }
        })
    }
}
const getBooksUnreturnedSync = (payload) => {
    return{
        type: GET_BOOKS_UNRETURNED,
        payload
    }
}