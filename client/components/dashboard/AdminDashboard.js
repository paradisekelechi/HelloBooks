import React from 'react';
import {connect} from 'react-redux';
import * as bookActions from '../../actions/bookActions';


class  AdminDashboard extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            books: {
                total: {
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
                finished: {
                    isLoading: true,
                    error: '',
                    count: 0,
                    list: {}
                },
                available: {
                    isLoading: true,
                    error: '',
                    count: 0,
                    list: {}
                },
            },
            users: {
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
            },
            userdata: {}
        }
    }

    /**
     * 
     * @returns {type} description
     * @memberof AdminDashboard
     */
    componentWillMount(){
        this.props.getAllBooks();
        this.props.getBooksAvailable();
        this.props.getBooksDeleted();
        this.props.getBooksFinished();
    }

 

    /**
     * 
     * 
     * @returns 
     * @memberof AdminDashboard
     */
    render(){

        return (
            <div>
                <div className="row">
                    <div className="col m3 s12">
                        <div className="card white">
                            <div className="card-content ">
                            <span className="card-title center">Total Books</span>
                            <h4 className="center counter">{this.props.books.total.count}</h4>
                            </div>
                        </div>
                    </div>
    
                    <div className="col m3 s12">
                        <div className="card white">
                            <div className="card-content ">
                            <span className="card-title center">Books Deleted</span>
                            <h4 className="center counter">{this.props.books.deleted.count}</h4>
                            </div>
                        </div>
                    </div>
    
                    <div className="col m3 s12">
                        <div className="card white">
                            <div className="card-content ">
                            <span className="card-title center">Books Finished</span>
                            <h4 className="center counter">{this.props.books.finished.count}</h4>
                            </div>
                        </div>
                    </div>
    
                    <div className="col m3 s12">
                        <div className="card white">
                            <div className="card-content">
                            <span className="card-title center">Books Available</span>
                            <h4 className="center counter">{this.props.books.available.count}</h4>
                            </div>
                        </div>
                    </div>
                </div>
    
                <div className="row">
    
                    <div className="col m3 s12">
                        <div className="card white">
                            <div className="card-content">
                            <span className="card-title center">Total Users</span>
                            <h4 className="center counter">{this.state.users.total.count}</h4>
                            </div>
                        </div>
                    </div>
    
                    <div className="col m3 s12">
                        <div className="card blue white">
                            <div className="card-content ">
                            <span className="card-title center">Deleted Users</span>
                            <h4 className="center counter">{this.state.users.deleted.count}</h4>
                            </div>
                        </div>
                    </div>
    
                    <div className="col m3 s12">
                        <div className="card white">
                            <div className="card-content">
                            <span className="card-title center">Active Users</span>
                            <h4 className="center counter">{this.state.users.admin.count}</h4>
                            </div>
                        </div>
                    </div>
    
                    <div className="col m3 s12">
                        <div className="card white">
                            <div className="card-content ">
                            <span className="card-title center">Admin Users</span>
                            <h4 className="center counter">{this.state.users.admin.count}</h4>
                            </div>
                        </div>
                    </div>
                </div>
    
                <div className="row">
                    <div className="col m6 s12">
                        <ul className="collapsible popout" data-collapsible="accordion">
                            <li>
                                <div className="collapsible-header"><i className="material-icons">person_pin</i>Admin User</div>
                                <div className="collapsible-body"><span>Lorem ipsum dolor sit amet.</span></div>
                            </li>
                            <li>
                                <div className="collapsible-header"><i className="material-icons">person_outline</i>Client User</div>
                                <div className="collapsible-body"><span>Lorem ipsum dolor sit amet.</span></div>
                            </li>
                            <li>
                                <div className="collapsible-header"><i className="material-icons">person_outline</i>Temporary User</div>
                                <div className="collapsible-body"><span>Lorem ipsum dolor sit amet.</span></div>
                            </li>
                        </ul>
                    </div>
    
                    <div className="col m6 s12">
                        <ul className="collapsible popout" data-collapsible="accordion">
                            <li>
                                <div className="collapsible-header"><i className="material-icons">person_outline</i>Platinium Client Account</div>
                                <div className="collapsible-body"><span>Lorem ipsum dolor sit amet.</span></div>
                            </li>
                            <li>
                                <div className="collapsible-header"><i className="material-icons">person_outline</i>Gold Client Account</div>
                                <div className="collapsible-body"><span>Lorem ipsum dolor sit amet.</span></div>
                            </li>
                            <li>
                                <div className="collapsible-header"><i className="material-icons">person_outline</i>Silver Client Account</div>
                                <div className="collapsible-body"><span>Lorem ipsum dolor sit amet.</span></div>
                            </li>
                        </ul>
                    </div>
    
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getAllBooks: () => {
            dispatch(bookActions.getBooks());
        },
        getBooksFinished: () => {
            dispatch(bookActions.getBooksFinished());
        },
        getBooksDeleted: () => {
            dispatch(bookActions.getBooksDeleted());
        },
        getBooksAvailable: () => {
            dispatch(bookActions.getBooksAvailable());
        }
    }
}

const mapStateToProps = (state, props) =>{
    return {
        users: state.userListReducer,
        books: state.bookListReducer
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminDashboard);