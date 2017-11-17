import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import * as userActions from '../../../actions/userActions';

/**
 *
 * @returns {Object} PageBar class
 * @class PageBar
 * @extends {React.Component}
 */
class PageBar extends React.Component {
  /**
   * Creates an instance of PageBar.
   * @param {Object} props
   * @memberof PageBar
   */
  constructor(props) {
    super(props);
    this.state = {
      user: {}
    };
    this.logoutUser = this.logoutUser.bind(this);
  }

  /**
   * @returns {void} description
   * @param {any} event
   * @memberof PageBar
   */
  logoutUser(event) {
    event.preventDefault();
    this.props.logout(this.state.user);
  }

  /**
   *
   * @returns {object} jsx object
   * @memberof PageBar
   */
  render() {
    return (
      <div className="row account-info account-details-bar">
        <span>{this.props.pageName}</span>
        <button onClick={this.logoutUser} className="btn dark-blue-background logoutButton right">
          <i className="material-icons option">
            power_settings_new
          </i>
        </button>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => {
      dispatch(userActions.logoutUser());
    }
  };
};

const mapStateToProps = (state) => {
  return {
    userDetails: state.userReducer
  };
};

PageBar.propTypes = {
  pageName: PropTypes.string.isRequired,
  logout: PropTypes.func.isRequired
};
export default connect(mapStateToProps, mapDispatchToProps)(PageBar);
