import React, { PropTypes } from 'react';

import Navigation from '../common/home/Navigation';
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
