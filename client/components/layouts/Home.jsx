/**
 *  @fileOverview Home layout component - handles the layout of the components
 *
 *  @author Paradise Kelechi
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import Navigation from '../common/Navigation';
import Footer from '../common/Footer';

/**
 * Home Function
 *
 * @param {Object} props
 * @returns {Object} JSX Object
 */
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
