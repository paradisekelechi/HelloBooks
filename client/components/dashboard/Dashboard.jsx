import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

import { authenticateFetch } from '../../utils/authenticate';
import AdminDashboard from './AdminDashboard';
import PageBar from '../common/main/PageBar';
import * as userActions from '../../actions/userActions';


/**
 *
 *
 * @class Dashboard
 * @extends {React.Component}
 */
class Dashboard extends React.Component {
    /**
       * Creates an instance of Dashboard.
       * @param {any} props
       * @memberof Dashboard
       */
    constructor(props) {
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
        };
    }

    /**
       *
       * @returns {void} description
       * @memberof Dashboard
       */
    componentWillMount() {
        const authStatus = authenticateFetch();
        if (!authStatus.loggedIn) {
            browserHistory.push('/signin');
        }
        this.state.userdata = this.props.users;
    }

    /**
       *
       *
       * @returns {object} render method
       * @memberof Dashboard
       */
    render() {
        if (this.props.users.usertype == 'ADMIN') {
            return (
                <div className="col m12">
                    <div className="col m8 offset-m4 main-content">
                        <PageBar pageName='Admin Dashboard' />
                        <AdminDashboard />
                    </div>
                </div>
            );
        }
        return (
            <div className="col m12">
                <div className="col m8 offset-m4 main-content">
                    <PageBar pageName='User Dashboard' />
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state, props) => ({
    users: state.userReducer
});
const mapDispatchToProps = (dispatch) => ({
    getUserData: () => {
        dispatch(userActions.logoutUser())
    }
});


export default connect(mapStateToProps)(Dashboard);
