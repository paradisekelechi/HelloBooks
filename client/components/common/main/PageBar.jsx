import React from 'react';
import {connect} from 'react-redux';

import * as userActions from '../../../actions/userActions';

/**
 * 
 * 
 * @class PageBar
 * @extends {React.Component}
 */
class PageBar extends React.Component {

    /**
     * Creates an instance of PageBar.
     * @param {any} props 
     * @memberof PageBar
     */
    constructor(props){
        super(props);
        this.state = {
            user: {}
        }
        this.logoutUser = this.logoutUser.bind(this);
    }

    /**
     * @returns {void} description
     * @param {any} event 
     * @memberof PageBar
     */
    logoutUser(event) {
        event.preventDefault;
        console.log('logging out user');
        this.props.logout(this.state.user);
    }

    /**
     * 
     * 
     * @returns 
     * @memberof PageBar
     */
    render(){
        return (
            <div className="row account-info account-details-bar">
                <span>{this.props.pageName}</span>
                <a className='cursor-hand'><i onClick = {this.logoutUser} className="material-icons option right">power_settings_new</i></a>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        logout: (data) => {
            dispatch(userActions.logoutUser(data));
        }
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PageBar);