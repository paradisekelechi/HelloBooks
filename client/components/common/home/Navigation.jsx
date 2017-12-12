import React from 'react';
import { authenticateFetch } from '../../../utils/authenticate';
import NavigationCard from '../components/NavigationCard';

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
      loggedIn: false
    };
  }
  /**
   *
   * @returns{*} sets state
   * @memberof Navigation
   */
  componentWillMount() {
    const { loggedIn } = authenticateFetch();
    this.setState({
      loggedIn
    });
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
                  <NavigationCard
                    title="Books"
                    description="Collection of Books"
                    link="/books"
                  />
                  <NavigationCard
                    title="Borrow History"
                    description="Book Borrow History"
                    link="/history"
                  />
                  <NavigationCard
                    title="Profile"
                    description="User's Profile Page"
                    link="/profile"
                  />
                  <NavigationCard
                    title="Logout"
                    description="Signin to application"
                    link="/signin"
                  />
                </div>
              )
            }


          </div>
        </div>
      </nav>
    );
  }
}

export default Navigation;
