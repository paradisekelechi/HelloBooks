import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { signupUser } from '../../actions/Authentication';
import background from '../../assets/img/background6.jpg';

/**
 * Signup class
 */
class Signup extends React.Component {
  /**
   * Creates an instance of Signup.
   *
   * @param {any} props
   *
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
   *Component Did Mount
   * @returns {void}
   * @memberof Signup
   */
  componentDidMount() {
    document.title = 'HelloBooks | Signup';
    $('.button-collapse').sideNav();
    $('.parallax').parallax();
    AOS.init();
  }

  /**
   * Generic onChange function
   * @returns {void}
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
   * @returns {void}
   * @param {Object} event
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
              className="col m4 offset-m4 auth-box dark-blue-text"
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
                    id="email"
                    type="text"
                    className="validate"
                  />
                  <label htmlFor="email" id="email">Email</label>
                </div>
                <div className="input-field col s12">
                  <input
                    onChange={this.onChange}
                    name="username"
                    id="username"
                    type="text"
                    className="validate"
                  />
                  <label htmlFor="username" id="username">Username</label>
                </div>
                <div className="input-field col s12 ">
                  <input
                    onChange={this.onChange}
                    name="password"
                    id="password"
                    type="password"
                    className="validate"
                  />
                  <label htmlFor="password" id="password">Password</label>
                </div>
                <div className="col s12">
                  <button
                    type="submit"
                    className="waves-effect waves-light btn btn-large col s12 dark-blue-background"
                  >
                    Register
                  </button>
                </div>
              </form>

              <div className="col s12">
                <br />
                <small>
                  <p>Already a User?</p>
                </small>
                <br />
              </div>
              <div className="col s12">
                <br />
                <Link to="/signin">
                  <button className="waves-effect waves-light btn col s12 dark-blue-background">
                    Signin
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
    signup: (userData) => {
      dispatch(signupUser(userData));
    }
  };
};

const mapStateToProps = (state) => {
  return {
    signupState: state.signupReducer[0]
  };
};

Signup.propTypes = {
  signup: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
