import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { authenticateFetch } from '../../helpers/Authentication';
import { getUserType } from '../../helpers/TypeSync';
import NavigationCard from './components/NavigationCard';
import { logoutUser } from '../../actions/Authentication';

/**
 * Navigation class
 *
 * @class Navigation
 * @extends {React.Component}
 */
class Navigation extends React.Component {
  /**
   * Creates an instance of Navigation.
   *
   * @param {any} props
   * @memberof Navigation
   */
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      userdata: {},
      toggleNav: true
    };
    this.logoutUser = this.logoutUser.bind(this);
  }
  /**
   * Component Will Mount
   *
   * @returns {void}
   * @memberof Navigation
   */
  componentWillMount() {
    const { loggedIn, userdata } = authenticateFetch();
    this.setState({
      loggedIn,
      userdata
    });
  }


  /**
   * Log out user function
   *
   * @returns {void}
   * @param {Object} event
   * @memberof PageBar
   */
  logoutUser(event) {
    event.preventDefault();
    this.props.logout(this.state.user);
  }

  /**
   * Toggles the navigation bar on smaller screens
   *
   * @param {Object} event
   * @memberof Navigation
   * @returns {void} toggles the navigation bar
   */
  handleNavToggle(event) {
    event.preventDefault();
    this.setState({
      toggleNav: !this.state.toggleNav
    });
  }

  /**
   * Render function
   *
   * @returns {Object} render object
   * @memberof Navigation
   */
  render() {
    return (
      <div>
        <nav className="navigation hide-on-med-and-up">
          <div className="container-fluid" onClick={this.handleNavToggle.bind(this)}>
            <div className="row">
              <div className="col s12">
                <div className="toggler" ><i className="material-icons">dehaze</i></div>
              </div>
            </div>
          </div>
        </nav>
        <nav id="main-nav" className={`navigation app-navigation ${this.state.toggleNav ? 'hide-on-small-only' : ''}`}>
          <div className="nav-wrapper container-fluid">
            <div className="row">
              <div className="col m1">

              </div>
              {!this.state.loggedIn ?
                (
                  <div>
                    <NavigationCard
                      title="Home"
                      description="Welcome and Landing page"
                      link="/"
                    />
                    <NavigationCard
                      title="Books"
                      description="Collection of Books"
                      link="/books"
                    />
                    <NavigationCard
                      title="About"
                      description="Description of the application"
                      link="/about"
                    />
                    <NavigationCard
                      title="Register"
                      description="Signup into the application"
                      link="/signup"
                    />
                    <NavigationCard
                      title="Login"
                      description="Signin to application"
                      link="/signin"
                    />
                  </div>
                ) :
                (
                  <div>
                    {getUserType(this.state.userdata.usertype) === 'ADMIN' ?
                      (
                        <NavigationCard
                          title="Dashboard"
                          description="Application Dashboard"
                          link="/dashboard"
                        />
                      ) :
                      ''
                    }
                    <NavigationCard
                      title="Books"
                      description="Collection of Books"
                      link="/books"
                    />
                    {getUserType(this.state.userdata.usertype) === 'ADMIN' ?
                      (
                        <NavigationCard
                          title="Settings"
                          description="Application Settings"
                          link="/settings"
                        />
                      ) :
                      (
                        <NavigationCard
                          title="Borrow History"
                          description="Book Borrow History"
                          link="/history"
                        />
                      )
                    }
                    <NavigationCard
                      title="Profile"
                      description="User's Profile Page"
                      link="/profile"
                    />

                    <div className="col m2 xs12 s12 nav-card" >
                      <div
                        className="card-link logout-link"
                        onClick={this.logoutUser}
                      >
                        <h4>Logout</h4>
                        <p>Leave the application</p>
                      </div>
                    </div>
                  </div>
                )
              }
            </div>
          </div>
        </nav>
      </div>
    );
  }
}

/**
 * Map Dispatch To Props
 *
 * @param {Object} dispatch
 * @returns {Object} dispatch actions
 */
const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => {
      dispatch(logoutUser());
    }
  };
};

const mapStateToProps = (state) => {
  return {
    userDetails: state.userReducer
  };
};

Navigation.propTypes = {
  logout: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);
