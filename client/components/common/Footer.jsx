/**
 *  @fileOverview Footer component
 *
 *  @author Paradise Kelechi
 *
 */

import React from 'react';
import { Link } from 'react-router';

/**
 * Footer function
 *
 * @returns {Object} JSX object
 */
const Footer = () => {
  return (
    <footer className="page-footer footer-color">
      <div className="footer-copyright">
        <div className="container">
          <div className="row">
            <div className="col s12 m6 offset-m3">
              <span>HelloBooks | Made by - </span>
              <Link className="brown-text text-lighten-3" to="https://andela.com">
                Kelechi Iheanyichukwu, Cohort 31 Andela
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
