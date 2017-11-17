import React, { PropTypes } from 'react';

/**
 * Import the common layout components
 */
import Footer from '../common/authentication/Footer';

const Authentication = (props) => {
  return (
    <div>
      {props.children}
      <Footer />
    </div>
  );
};

Authentication.propTypes = {
  children: PropTypes.object.isRequired
};

export default Authentication;
