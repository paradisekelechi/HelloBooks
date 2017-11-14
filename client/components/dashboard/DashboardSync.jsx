import React, { PropTypes } from 'react';
import AdminDashboard from './AdminDashboard';
import ClientDashboard from './ClientDashboard';

const DashboardSync = (props) => {
  if (props.userType === 'ADMIN') {
    return (
      <div className="col m12">
        <div className="col m8 offset-m4 main-content">
          <AdminDashboard />
        </div>
      </div>
    );
  }
  return (
    <div className="col m12">
      <div className="col m8 offset-m4 main-content">
        <ClientDashboard />
      </div>
    </div>
  );
};

DashboardSync.propTypes = {
  userType: PropTypes.string.isRequired
};

export default DashboardSync;
