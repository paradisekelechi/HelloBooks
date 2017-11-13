import React from 'react';
import { connect } from 'react-redux';
import AdminDashboard from './AdminDashboard';
import PageBar from '../common/main/PageBar';


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
      name: 'kelechi'
    };
  }

  /**
   * Will mount
   * @returns {*} value
   * @memberof Dashboard
   */
  componentWillMount() {
    console.log(this.props);
  }

  /**
 * Will mount
 * @returns {*} value
 * @memberof Dashboard
 */
  render() {
    return (
      <div className="col m12">
        <div className="col m8 offset-m4 main-content">
          <PageBar pageName="Admin Dashboard" />
          <AdminDashboard />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  userDetails: state.userReducer
});

export default connect(mapStateToProps)(Dashboard);
