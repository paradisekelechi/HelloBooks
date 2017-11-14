import React from 'react';
import { connect } from 'react-redux'; import {
  browserHistory
} from 'react-router';
import checkLogin from '../../actions/AuthenticationActions';
import { authenticateFetch } from '../Authenticate';

/**
 * Export HOC
 *
 * @export
 * @param {any} Component
 * @returns {Object} Authenticated Component
 */
const AuthorizeUser = (Component) => {
  /**
   * Authorize Class
   *
   * @class Authorize
   * @extends {React.Component}
   */
  class Authorize extends React.Component {

    /**
     * Creates an instance of Authorize.
     * @param {any} props
     * @memberof Authorize
     * @returns {*} Creates the state
     */
    constructor(props) {
      super(props);
      this.state = {
        loggedIn: false,
        user: {}
      };
    }

    /**
     *
     * Checks the login status before rendering
     * @returns {*} state
     * @memberof Authorize
     */
    componentWillMount() {
      const loginPayload = authenticateFetch();
      const { loggedIn } = loginPayload;
      if (!loggedIn) {
        browserHistory.push('/signin');
      }
    }

    /**
     * Render Method
     *
     * @returns {Object} Jsx Object
     * @memberof Authorize
     */
    render() {
      return (
        <Component {...this.props} />
      );
    }
  }
  const mapDispatchToProps = (dispatch) => {
    return {
      getLoginStatus: () => {
        dispatch(checkLogin());
      }
    };
  };

  const mapStateToProps = (state) => {
    return {
      userCredentials: state.userReducer[0]
    };
  };

  return connect(mapStateToProps, mapDispatchToProps)(Authorize);
};

export default AuthorizeUser;
