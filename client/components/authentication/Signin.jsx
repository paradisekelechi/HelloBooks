import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import * as userActions from '../../actions/userActions';

/**
 *
 *
 * @class Signin
 * @extends {React.Component}
 */
class Signin extends React.Component {

  /**
   * Creates an instance of Signin.
   * @param {object} props
   * @param {object} context
   * @memberof Signin
   */
  constructor(props, context) {
    super(props, context);
    this.state = {
      user: {
        username: '',
        password: ''
      }
    };
    this.onUsernameChange = this.onUsernameChange.bind(this);
    this.onPasswordChange = this.onPasswordChange.bind(this);
    this.onClickSubmit = this.onClickSubmit.bind(this);
  }

  /**
   *
   * @returns {void} description
   * @param {object} event
   * @memberof Signin
   */
  onUsernameChange(event) {
    const { user } = this.state;
    user.username = event.target.value;
    this.setState({
      user
    });
  }

  /**
   *
   * @returns {void} description
   * @param {object} event
   * @memberof Signin
   */
  onPasswordChange(event) {
    event.preventDefault();
    const { user } = this.state;
    user.password = event.target.value;
    this.setState({
      user
    });
  }

  /**
   *
   * @returns {void} description
   * @param {any} event
   * @memberof Signin
   */
  onClickSubmit(event) {
    event.preventDefault();
    this.props.signin(this.state.user);
    // alert(`We are here! Username: ${this.state.user.username} and Password: ${this.state.user.password}`);
  }

  /**
   *
   *
   * @returns {Object}  react object
   * @memberof Signin
   */
  render() {
    return (
      <div className="container">
        <div className="row authentication-row">
          <div className="col m4 offset-m4">
            <h5 className="center authentication-header">Account Signin</h5>
            <div className="col s12">
              <button className="waves-effect waves-light btn col s12 red ">Google Plus Signin</button>
            </div>
            <div className="col s12">
              <br />
              <p className="center">OR</p>
            </div>
            <div className="input-field col s12">
              <input id="last_name" type="text" onChange={this.onUsernameChange} value={this.state.username} className="validate" />
              <label htmlFor="username">Username</label>
            </div>
            <div className="input-field col s12 ">
              <input id="last_name" type="password" onChange={this.onPasswordChange} value={this.state.password} className="validate" />
              <label htmlFor="password">Password</label>
            </div>
            <div className="col s12">
              <button type="submit" onClick={this.onClickSubmit} className="waves-effect waves-light btn btn-large col s12 blue darken-3 ">Signin</button>
            </div>
            <div className="col s12">
              <br />
              <small className="">Not yet a User?</small>
              <br />
            </div>
            <div className="col s12">
              <br />
              <a href="register.html">
                <button className="waves-effect waves-light btn col s12 blue darken-3">Register</button>
              </a>
            </div>
          </div>
        </div>

      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    signin: (userData) => {
      dispatch(userActions.signinUser(userData))
    }
  };
};

const mapStateToProps = (state) => {
  return {
    userState: state.users
  };
};

Signin.proptypes = {
  signin: PropTypes.object.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(Signin);