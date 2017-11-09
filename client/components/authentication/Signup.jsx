import React from 'react';
import { connect } from 'react-redux';
import * as userActions from '../../actions/userActions';

/*eslint-disable no-console */
/**
 * 
 * 
 * @class Signup
 * @extends {React.Component}
 */
class Signup extends React.Component {

  /**
   * Creates an instance of Signup.
   * @param {any} props 
   * @memberof Signup
   */
  constructor(props) {
    super(props);
    this.state = {
      user: {
        username: '',
        password: '',
        email: ''
      }
    };
    this.onEmailChange = this.onEmailChange.bind(this);
    this.onUsernameChange = this.onUsernameChange.bind(this);
    this.onPasswordChange = this.onPasswordChange.bind(this);
    this.onClickSubmit = this.onClickSubmit.bind(this);
  }

  /**
   * 
   * @returns {void} description
   * @param {any} event 
   * @memberof Signup
   */
  onEmailChange(event) {
    const user = this.state.user;
    user.email = event.target.value;
    this.setState({
      user: user
    });
  }

  /**
   * 
   * @returns {void} description
   * @param {any} event 
   * @memberof Signup
   */
  onUsernameChange(event) {
    const user = this.state.user;
    user.username = event.target.value;
    this.setState({
      user: user
    });
  }

  /**
   * 
   * @returns {void} description
   * @param {any} event 
   * @memberof Signup
   */
  onPasswordChange(event) {
    const user = this.state.user;
    user.password = event.target.value;
    this.setState({
      user: user
    });
  }

  /**
   * 
   * @returns {void} description
   * @param {any} event 
   * @memberof Signup
   */
  onClickSubmit(event) {
    event.preventDefault;
    console.log(this.state);
    this.props.signup(this.state.user);
  }

  /**
   * 
   * 
   * @returns 
   * @memberof Signup
   */
  render() {
    return (
      <div className="container">
        <div className="row authentication-row">
          <div className="col m4 offset-m4">
            <h5 className="center authentication-header">Register Account</h5>

            <div className="input-field col s12">
              <input id="email" type="text" value={this.state.user.email} onChange={this.onEmailChange} className="validate" />
              <label>Email</label>
            </div>
            <div className="input-field col s12">
              <input id="username" name='username' type="text" value={this.state.user.username} onChange={this.onUsernameChange} className="validate" />
              <label>Username</label>
            </div>
            <div className="input-field col s12 ">
              <input id="password" type="text" name='password' value={this.state.user.password} onChange={this.onPasswordChange} className="validate" />
              <label>Password</label>
            </div>
            <div className="col s12">
              <button type="submit" onClick={this.onClickSubmit} className="waves-effect waves-light btn btn-large col s12 blue darken-3 ">Register</button>
            </div>

            <div className="col s12">
              <br />
              <small className="">Already a User?</small>
              <br />
            </div>
            <div className="col s12">
              <br />
              <a href="register.html">
                <button className="waves-effect waves-light btn col s12 blue darken-3">Signin</button>
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
    signup: (userData) => {
      dispatch(userActions.signupUser(userData));
    }
  };
};

const mapStateToProps = (state, ownProps) => {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Signup);