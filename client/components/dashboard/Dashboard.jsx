import React from 'react';
import DashboardSync from './DashboardSync';
import { authenticateFetch } from '../../utils/authenticate';
import { getUserType, getAccountType } from '../../utils/TypeSync';


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
   * Check usertype and determine what to display
   * @returns {*} sets state
   * @memberof Dashboard
   */
  componentWillMount() {
    const loginPayload = authenticateFetch();
    const { userdata } = loginPayload;
    const { state } = this;
    state.userType = getUserType(userdata.usertype);
    state.accountType = getAccountType(userdata.accounttype);
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

export default Dashboard;
