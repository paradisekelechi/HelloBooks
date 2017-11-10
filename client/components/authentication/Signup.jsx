import React from 'react';
import { connect } from 'react-redux';
import * as userActions from '../../actions/userActions';
import background from '../../assets/img/background6.jpg';

/**
 * Signup class
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
   * @returns {Object} description
   * @param {Object} event
   * @memberof Signup
   */
  onEmailChange(event) {
    const user = this.state.user;
    user.email = event.target.value;
    this.setState({
      user
    });
  }

  /**
   * 
   * @returns {Object} description
   * @param {Object} event
   * @memberof Signup
   */
  onUsernameChange(event) {
    const user = this.state.user;
    user.username = event.target.value;
    this.setState({
      user
    });
  }

  /**
   * 
   * @returns {Object} description
   * @param {Object} event
   * @memberof Signup
   */
  onPasswordChange(event) {
    const user = this.state.user;
    user.password = event.target.value;
    this.setState({
      user
    });
  }

  /**
   *
   * @returns {void} description
   * @param {any} event
   * @memberof Signup
   */
  onClickSubmit() {
    this.props.signup(this.state.user);
  }

  /**
   *
   *
   * @returns {Object} rendered jsx object
   * @memberof Signup
   */
  render() {
    return (
      <div className="parallax-container">
        <div className="container">
          <div className="row authentication-row">
            <div className="col m4 offset-m4 auth-box" data-aos="flip-left" data-aos-easing="ease-out-cubic" data-aos-duration={2000}>
              <h5 className="center authentication-header">Register Account</h5>
              <div className="input-field col s12">
                <input id="last_name" type="text" className="validate" />
                <label id="signup_email">Email</label>
              </div>
              <div className="input-field col s12">
                <input id="last_name" type="text" className="validate" />
                <label id="signup_username">Username</label>
              </div>
              <div className="input-field col s12 ">
                <input id="last_name" type="text" className="validate" />
                <label id="signup_password">Password</label>
              </div>
              <div className="col s12">
                <a href="dashboard-user.html">
                  <button className="waves-effect waves-light btn btn-large col s12 blue darken-3">
                    Register
                  </button>
                </a>
              </div>
              <div className="col s12">
                <br />
                <small className>
                  <p>Already a User?</p>
                </small>
                <br />
              </div>
              <div className="col s12">
                <br />
                <a href="signin.html">
                  <button className="waves-effect waves-light btn col s12 blue darken-3">
                    Signin
                  </button>
                </a>
              </div>
            </div>
            <div className="parallax">
              <img src={background} alt="Unsplashed background img 1" />
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

const mapStateToProps = (state) => {
  return {
    user: state.user
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
