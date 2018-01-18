/**
 *  @fileOverview Dashboard component - acts as the dashboard wrapper component
 *
 *  @author Paradise Kelechi
 *
 */

import React from 'react';
import { authenticateFetch } from '../../helpers/Authentication';
import { getUserType, getAccountType } from '../../helpers/TypeSync';
import AdminDashboard from './AdminDashboard';


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
   *
   * @returns {void} sets state
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
   *
   * @returns {void} nothing
   * @memberof Dashboard
   */
  componentDidMount() {
    document.title = 'HelloBooks | Dashboard';
  }

  /**
 * Render method
 *
 * @returns {Object} JSX object
 * @memberof Dashboard
 */
  render() {
    if (this.state.userType === 'ADMIN') {
      return (
        <div className="container-fluid main-wrapper">
          <div className="row page-info">
            <div className="col m1"></div>
            <div className="col m10">
              <h5>Dashboard</h5>
            </div>
          </div>
          <div className="row">
            <div className="col m1"></div>
            <div className="col m10 s12">
              <AdminDashboard />
            </div>
          </div>
        </div>
      );
    }
  }
}

export default Dashboard;
