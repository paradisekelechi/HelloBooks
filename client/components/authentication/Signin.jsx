import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import background from '../../assets/img/background6.jpg';
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
 * @returns {void} no object
 * @memberof Signin
 */
  componentDidMount() {
    $('.button-collapse').sideNav();
    $('.parallax').parallax();
    AOS.init();
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
  }

  /**
   *
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
                <button className="waves-effect waves-light btn col s12 red ">
                  Google Plus Signin
                </button>
              </div>
              <div className="col s12">
                <br />
                <p className="center">OR</p>
              </div>
              <div className="input-field col s12">
                <input id="last_name" type="text" className="validate" />
                <label htmlFor="last_name">Username</label>
              </div>
              <div className="input-field col s12 ">
                <input id="last_name" type="password" className="validate" />
                <label htmlFor="last_name">Password</label>
              </div>
              <div className="col s12">
                <a href="dashboard-admin.html">
                  <button className="waves-effect waves-light btn btn-large col s12 blue darken-3 ">
                    Signin
                  </button>
                </a>
              </div>
              <div className="col s12">
                <br />
                <span className>
                  <p>Not yet a User?</p>
                </span>
                <br />
              </div>
              <div className="col s12">
                <br />
                <a href="register.html">
                  <button className="waves-effect waves-light btn col s12 blue darken-3" >
                    Register
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
    signin: userData =>
      dispatch(userActions.signinUser(userData)),
  };
};

const mapStateToProps = (state) => {
  return {
    userState: state.users
  };
};

Signin.propTypes = {
  signin: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(Signin);
