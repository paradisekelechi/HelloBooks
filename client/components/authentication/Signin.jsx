import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { connect } from 'react-redux';


import background from '../../assets/img/background6.jpg';
import { signinUser, googleSigninUser } from '../../actions/Authentication';

/**
 *
 *
 * @class Signin
 *
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
    this.onChange = this.onChange.bind(this);
    this.onClickSubmit = this.onClickSubmit.bind(this);
    this.onSignIn = this.onSignIn.bind(this);
  }

  /**
 *
 * @returns {void}
 *
 * @memberof Signin
 */
  componentDidMount() {
    document.title = 'HelloBooks | Signin';
    $('.button-collapse').sideNav();
    $('.parallax').parallax();
    AOS.init();
  }

  /**
   *
   * @returns {void}
   *
   * @param {object} event
   *
   * @memberof Signin
   */
  onChange(event) {
    event.preventDefault();
    const { user } = this.state;
    user[event.target.name] = event.target.value;
    this.setState({
      user
    });
  }

  /**
   * Handles the submit of the form after clicking the submit button
   * @returns {void}
   *
   * @param {Object} event
   *
   * @memberof Signin
   */
  onClickSubmit(event) {
    event.preventDefault();
    this.props.signin(this.state.user);
  }

  /**
   * Google Signin
   *
   * @memberof Signin
   *
   * @returns {void}
   */
  onSignIn() {
    const googleAuth = gapi.auth2.getAuthInstance();
    googleAuth.signIn();
    googleAuth.currentUser.listen((currentUser) => {
      const userProfile = currentUser.getBasicProfile();
      const {
        wea: username,
        U3: email,
        Eea: password
      } = userProfile;
      const userdata = { username, email, password };
      this.props.googleSignin(userdata);
    });
  }

  /**
   * Render function
   *
   * @returns {Object}  react object
   * @memberof Signin
   */
  render() {
    return (
      <div className="parallax-container">
        <div className="container">
          <div className="row authentication-row">
            <div
              className="col m4 offset-m4 auth-box"
              data-aos="flip-left"
              data-aos-easing="ease-out-cubic"
              data-aos-duration={2000}
            >
              <h5 className="center authentication-header">Account Signin</h5>
              <div className="col s12">
                <button
                  onClick={this.onSignIn}
                  className="waves-effect waves-light btn  btn-red col s12 "
                >
                  Google Plus Signin
                </button>
                <div className="g-signin2" hidden="true"></div>
              </div>
              <div className="col s12">
                <br />
                <p className="center">OR</p>
              </div>
              <form onSubmit={this.onClickSubmit} >
                <div className="input-field col s12">
                  <input
                    id="username"
                    name="username"
                    onChange={this.onChange}
                    type="text"
                    className="validate"
                  />
                  <label htmlFor="username">Username</label>
                </div>
                <div className="input-field col s12 ">
                  <input
                    id="password"
                    name="password"
                    onChange={this.onChange}
                    type="password"
                    className="validate"
                  />
                  <label htmlFor="password">Password</label>
                </div>
                <div className="col s12">
                  <button
                    className="waves-effect waves-light btn btn-large col s12 dark-blue-background "
                  >
                    Signin
                  </button>
                </div>
              </form>
              <div className="col s12">
                <br />
                <span>
                  <p>Not yet a User?</p>
                </span>
                <br />
              </div>
              <div className="col s12">
                <br />
                <Link to="/signup">
                  <button className="waves-effect waves-light btn col s12 dark-blue-background" >
                    Register
                  </button>
                </Link>
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
    signin: userData =>
      dispatch(signinUser(userData)),
    googleSignin: userDetails =>
      dispatch(googleSigninUser(userDetails))
  };
};

const mapStateToProps = (state) => {
  return {
    signinState: state.signinReducer[0]
  };
};

Signin.propTypes = {
  signin: PropTypes.func.isRequired,
  googleSignin: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(Signin);
