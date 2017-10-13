import React from 'react';
import {connect} from 'react-redux';

import {authenticateFetch} from '../../utils/authenticate';
import AdminDashboard from './AdminDashboard';
import PageBar from '../common/main/PageBar';
import * as bookActions from '../../actions/bookActions';


/**
 * 
 * 
 * @class Dashboard
 * @extends {React.Component}
 */
class Dashboard extends React.Component{

    /**
     * Creates an instance of Dashboard.
     * @param {any} props 
     * @memberof Dashboard
     */
    constructor(props){
        super(props);
        this.state = {
            books: [{
                borrowed: {
                    isLoading: true,
                    error: '',
                    count: 0,
                    list: {}
                },
                unreturned: {
                    isLoading: true,
                    error: '',
                    count: 0,
                    list: {}
                },
                total: {
                    isLoading: true,
                    error: '',
                    count: 0,
                    list: {}
                },
            }],
            users: [{
                total: {
                    isLoading: true,
                    error: '',
                    count: 0,
                    list: {}
                },
                admin: {
                    isLoading: true,
                    error: '',
                    count: 0,
                    list: {}
                },
                client: {
                    isLoading: true,
                    error: '',
                    count: 0,
                    list: {}
                },
                deleted: {
                    isLoading: true,
                    error: '',
                    count: 0,
                    list: {}
                },
            }],
            userdata: {}
        }
        this.testSomething = this.testSomething.bind(this);
    }

    /**
     * 
     * @returns {type} description
     * @memberof Dashboard
     */
    testSomething(){
        this.props.getAllBooks();
        console.log(this.props);
    }
    /**
     * 
     * @returns {void} description
     * @memberof Dashboard
     */
    componentDidMount (){
        this.props.getAllBooks();
        this.props.getBooksBorrowed();
        this.props.getBooksUnreturned();
        this.setState({
            books: this.props.bookListReducer,
            users: this.props.userListReducer
        });
    }
    
    /**
     * 
     * 
     * @returns 
     * @memberof Dashboard
     */
    render(){
        
        if(this.props.users.usertype == 'ADMIN'){
            return(
                <div className="col m12">
                    <div className="col m8 offset-m4 main-content">
                        <PageBar pageName='Admin Dashboard' />
                        <AdminDashboard users={this.state.users} books={this.state.books} />
                        <p onClick={this.testSomething}>Testing stuffs for use</p>
                    </div>
                </div>
            );
        }else{
            return(
                <div className="col m12">
                    <div className="col m8 offset-m4 main-content">
                        <PageBar pageName='User Dashboard' />
                    </div>
                </div>
            );
        }
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getAllBooks: () => {
            dispatch(bookActions.getBooks());
        },
        getBooksBorrowed: () => {
            dispatch(bookActions.getBooksBorrowed());
        },
        getBooksUnreturned: () => {
            dispatch(bookActions.getBooksUnreturned());
        }
    }
}

const mapStateToProps = (state, props) =>{
    return {
        users: state.userReducer,
        books: state.bookReducer
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);