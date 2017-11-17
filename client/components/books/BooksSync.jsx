import React, { PropTypes } from 'react';
import PageBar from '../common/main/PageBar';
import AdminBooks from './AdminBooks';
import ClientBooks from './ClientBooks';

const BooksSync = (props) => {
  if (props.userType === 'ADMIN') {
    return (
      <div className="col m12">
        <div className="col m8 offset-m4 main-content">
          <PageBar pageName="Admin Books" />
          <AdminBooks />
        </div>
      </div>
    );
  }
  return (
    <div className="col m12">
      <div className="col m8 offset-m4 main-content">
        <PageBar pageName="Client Books" />
        <ClientBooks />
      </div>
    </div>
  );
};

BooksSync.propTypes = {
  userType: PropTypes.string.isRequired
};

export default BooksSync;
