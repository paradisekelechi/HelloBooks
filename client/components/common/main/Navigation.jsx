import React from 'react';
import { Link } from 'react-router';

import profileImage from '../../../assets/img/profile.jpg';

const Navigation = () => {
  return (
    <div className="custom-nav">
      <ul id="slide-out" className="side-nav fixed" >
        <span className="dashboard-logo brand-logo">HelloBooks</span>
        <div className="container">
          <hr />
        </div>
        <div className="row hbk-row">
          <div className="col m6 offset-m3 col s8 offset-s2">
            <img alt="profile" src={profileImage} className="responsive-img circle" width="100%" />
            <span>user@user.com</span>
          </div>
        </div>
        <li className="nav-link">
          <Link to="/dashboard" activeClassName="active indigo">
            <i className="material-icons white-text">dashboard</i>DASHBOARD
          </Link>
        </li>
        <li className="nav-link">
          <Link to="/profile" activeClassName="active indigo">
            <i className="material-icons">face</i>PROFILE
          </Link>
        </li>
        <li className="nav-link">
          <Link to="books" activeClassName="active indigo" >
            <i className="material-icons">book</i>BOOKS
          </Link>
        </li>
        <li className="nav-link">
          <Link to="/" activeClassName="active indigo" >
            <i className="material-icons">mail_outline</i>NOTIFICATIONS
          </Link>
        </li>


      </ul>
    </div>
  );
};
export default Navigation;
