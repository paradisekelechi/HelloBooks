import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { authenticateFetch } from '../../helpers/Authentication';
import { getUserType } from '../../helpers/TypeSync';
import NavigationCard from './components/NavigationCard';
import { logoutUser } from '../../actions/Authentication';

/**
 *
 *
 * @class Navigation
 * @extends {React.Component}
 */
class Navigation extends React.Component {
  /**
   * Creates an instance of Navigation.
   * @param {any} props
   * @memberof Navigation
   */
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      userdata: {}
    };
    this.logoutUser = this.logoutUser.bind(this);
  }
  /**
   *
   * @returns{*} sets state
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
   * @returns {void} description
   * @param {any} event
   * @memberof PageBar
   */
  logoutUser(event) {
    event.preventDefault();
    this.props.logout(this.state.user);
  }

  /**
   *
   *
   * @returns {Object} render object
   * @memberof Navigation
   */
  render() {
    return (
      <nav className="navigation app-navigation">
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
                        title="Setting"
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
    );
  }
}


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
