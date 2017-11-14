import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import DashboardSync from './DashboardSync';


/**
 *
 *
 * @class Dashboard
 * @extends {React.Component}
 */
class Dashboard extends React.Component {
  /**
     * Creates an instance of Dashboard.
     * @param {any} props
     * @memberof Dashboard
     */
  constructor(props) {
    super(props);
    this.state = {
      userType: 'CLIENT',
      accountType: 'SILVER'
    };
  }

  /**
   * Will mount method
   * @returns {*} value
   * @memberof Dashboard
   */
  componentWillMount() {
    const userData = this.props.userDetails;
    const { state } = this;
    state.userType = userData.userType;
    state.accountType = userData.accountType;
    this.setState(state);
  }

  /**
 * render method
 * @returns {*} value
 * @memberof Dashboard
 */
  render() {
    return (
      <div>
        <DashboardSync userType={this.state.userType} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  userDetails: state.userReducer[0]
});

Dashboard.propTypes = {
  userDetails: PropTypes.object.isRequired
};

export default connect(mapStateToProps)(Dashboard);
