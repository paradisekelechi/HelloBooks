import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

/**
 * 
 * 
 * @export
 * @param {any} Component
 * @returns  {Function} authenticated component
 */
export default function requiresAuth(Component) {

  /**
   * The authenticated component class
   *
   * @class AuthenticatedComponent
   * @extends {React.Component}
   */
  class AuthenticatedComponent extends React.Component {

    /**
     * Component Did mount
     * @returns {Object} check and redirect function
     * @memberof AuthenticatedComponent
     */
    componentDidMount() {
      this.checkAndRedirect();
    }

    /**
     * Component Did update
     * @returns {Object} check and redirect function
     * @memberof AuthenticatedComponent
     */
    componentDidUpdate() {
      this.checkAndRedirect();
    }

    /**
     * Check and redirect
     * @returns {Object} check and redirect function
     * @memberof AuthenticatedComponent
     */
    checkAndRedirect() {
      const { dispatch } = this.props;

      if (!this.props.user) {
        dispatch(push('/signin'));
      }
    }

    /**
    * Render method
    * @returns {Object} render function
    * @memberof AuthenticatedComponent
    */
    render() {
      return (
        <div className="authenticated">
          {this.props.user ? <Component {...this.props} /> : null}
        </div>
      );
    }
  }

  const mapStateToProps = (state) => {
    return {
      user: state.account.user
    };
  };

  AuthenticatedComponent.propTypes = {
    user: PropTypes.object,
    dispatch: PropTypes.func.isRequired
  }

  return connect(mapStateToProps)(AuthenticatedComponent);
}