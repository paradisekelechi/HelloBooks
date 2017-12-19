import React from 'react';
import PropTypes from 'prop-types';

import Navigation from '../common/Navigation';
import Footer from '../common/Footer';


const Home = (props) => {
  return (
    <div>
      <Navigation />
      {props.children}
      <Footer />
    </div>
  );
};

Home.propTypes = {
  children: PropTypes.object.isRequired
};

export default Home;
