import React from 'react';
import {
  browserHistory
} from 'react-router';
import { authenticateFetch } from '../authenticate';

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

  return Authorize;
};

export default AuthorizeUser;
