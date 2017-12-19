import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { connect } from 'react-redux';

import background from '../../assets/img/background6.jpg';
import * as userActions from '../../actions/User';

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
    this.onChange = this.onChange.bind(this);
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
   * @returns {*} description
   * @param {object} event
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
              <form onSubmit={this.onClickSubmit} >
                <div className="input-field col s12">
                  <input
                    id="last_name"
                    name="username"
                    onChange={this.onChange}
                    type="text"
                    className="validate"
                  />
                  <label htmlFor="last_name">Username</label>
                </div>
                <div className="input-field col s12 ">
                  <input
                    id="last_name"
                    name="password"
                    onChange={this.onChange}
                    type="password"
                    className="validate"
                  />
                  <label htmlFor="last_name">Password</label>
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
                <span className>
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
      dispatch(userActions.signinUser(userData)),
  };
};

const mapStateToProps = (state) => {
  return {
    signinState: state.signinReducer[0]
  };
};

Signin.propTypes = {
  signin: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(Signin);
