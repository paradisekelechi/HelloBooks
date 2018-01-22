/**
 *  @fileOverview Home layout component - handles the layout of the components
 *
 *  @author Paradise Kelechi
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
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

      {props.children}
      <Footer />
    </div>
  );
};

Home.propTypes = {
  children: PropTypes.object.isRequired
};

export default Home;
