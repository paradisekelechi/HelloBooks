import React, { PropTypes } from 'react';
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
    this.onChange = this.onChange.bind(this);
    this.onClickSubmit = this.onClickSubmit.bind(this);
  }

  /**
   *
   * @returns {void} no object
   * @memberof Signup
   */
  componentDidMount() {
    $('.button-collapse').sideNav();
    $('.parallax').parallax();
    AOS.init();
  }

  /**
   * Generic onChange function
   * @returns {void} returns nothing
   * @param {any} event
   * @memberof Signup
   */
  onChange(event) {
    event.preventDefault();
    const { user } = this.state;
    user[event.target.name] = event.target.value;
    this.setState({ user });
  }

  /**
   *
   * @returns {void} description
   * @param {any} event
   * @memberof Signup
   */
  onClickSubmit(event) {
    event.preventDefault();
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
            <div
              className="col m4 offset-m4 auth-box"
              data-aos="flip-left"
              data-aos-easing="ease-out-cubic"
              data-aos-duration={2000}
            >
              <h5 className="center authentication-header">Register Account</h5>
              <form onSubmit={this.onClickSubmit}>
                <div className="input-field col s12">
                  <input
                    onChange={this.onChange}
                    name="email"
                    id="last_name"
                    type="text"
                    className="validate"
                  />
                  <label htmlFor="email" id="signup_email">Email</label>
                </div>
                <div className="input-field col s12">
                  <input
                    onChange={this.onChange}
                    name="username"
                    id="last_name"
                    type="text"
                    className="validate"
                  />
                  <label htmlFor="username" id="signup_username">Username</label>
                </div>
                <div className="input-field col s12 ">
                  <input
                    onChange={this.onChange}
                    name="password"
                    id="last_name"
                    type="password"
                    className="validate"
                  />
                  <label htmlFor="password" id="signup_password">Password</label>
                </div>
                <div className="col s12">
                  <button
                    type="submit"
                    className="waves-effect waves-light btn btn-large col s12 blue darken-3"
                  >
                    Register
                  </button>
                </div>
              </form>

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
    userReducer: state.user
  };
};

Signup.propTypes = {
  signup: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
