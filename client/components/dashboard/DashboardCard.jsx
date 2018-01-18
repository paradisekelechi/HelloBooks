/**
 *  @fileOverview DashboardCard component - renders a cdashboard card
 *
 *  @author Paradise Kelechi
 *
 */

import React from 'react';
import PropTypes from 'prop-types';

/**
 * Dashboard Card
 *
 * @param {Object} props
 * @returns {Object} JSX Object
 */
const DashboardCard = (props) => {
  return (
    <div className="col m3 s12">
      <div className="card white">
        <div className="card-content ">
          <span className="card-title center">{props.title}</span>
          <h4 className="center counter">{props.count}</h4>
        </div>
      </div>
    </div>
  );
};

DashboardCard.propTypes = {
  count: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired
};

export default DashboardCard;
