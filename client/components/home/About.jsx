import React from 'react';
import { Link } from 'react-router';

/**
 * About function
 * @returns {Object} JSX Object
 */
const About = () => {
  document.title = 'HelloBooks | About';
  return (
    <div className="container-fluid main-wrapper">
      <div className="row about">
        <div className="col m1"></div>
        <div className="col m10">
          <h5>About HelloBooks</h5>
          <p>HelloBooks is an online book library application.
            It is aimed at helping users see books and borrow accordingly.
            The individual functions of HelloBooks application
          </p>
          <ul>
            <li>View Books In The Catalog</li>
            <li>Borrow Books </li>
            <li>Read Books</li>
          </ul>
        </div>
      </div>
      <div className="row about">
        <div className="col m1"></div>
        <div className="col m10">
          <h5>Contributions</h5>
          <p>Do you desire to contribute to this amazing application?
            Are there recommendations you would love to make to the application?
            Click on this link
          </p>
          <Link target="_blank" to="https://github.com/paradisekelechi/HelloBooks">
            HelloBooks Github repository
          </Link>
        </div>
      </div>
      <div className="row about">
        <div className="col m1"></div>
        <div className="col m10">
          <h5>API Documentation</h5>
          <p>Have a graceful peek at the Application Programming Interface that makes up
            the HelloBooks application by clicking on
          </p>
          <Link target="_blank" to="https://hellobooks2.docs.apiary.io/">
            HelloBooks API Documentation
          </Link>
        </div>
      </div>
    </div>
  );
};


export default About;
