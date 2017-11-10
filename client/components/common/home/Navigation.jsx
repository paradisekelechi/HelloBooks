import React from 'react';
import { Link } from 'react-router';

const Navigation = () => {
  return (
    <nav className="navigation">
      <div className="nav-wrapper container">
        <Link to="/" id="logo-container" className="brand-logo">HelloBooks</Link>
        <ul className="right hide-on-med-and-down">
          <li>
            <Link to="/" >Home</Link>
          </li>
          <li>
            <Link to="/signin" >Signin</Link>
          </li>
          <li>
            <Link to="/signup" >Signup</Link>
          </li>
        </ul>

        <ul id="nav-mobile" className="side-nav">
          <li>
            <Link to="/" >Home</Link>
          </li>
          <li>
            <Link to="/signin" >Signin</Link>
          </li>
          <li>
            <Link to="/signup" >Signup</Link>
          </li>
        </ul>
        <Link to="/" data-activates="nav-mobile" className="button-collapse">
          <i className="material-icons">menu</i>
        </Link>
      </div>
    </nav>
  );
};

export default Navigation;
