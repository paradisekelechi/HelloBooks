import React from 'react';
import PropTypes from 'prop-types';
import Navigation from '../common/main/Navigation';


const Main = (props) => {
  return (
    <div>
      <Navigation />
      <a
        href="#"
        data-activates="slide-out"
        className="button-collapse account-slideout account-info"
      >
        <i className="material-icons">menu</i>
      </a>
      {props.children}
    </div>
  );
};

Main.propTypes = {
  children: PropTypes.object.isRequired
};

export default Main;
