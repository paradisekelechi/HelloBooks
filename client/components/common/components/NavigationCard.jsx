import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';

const NavigationCard = (props) => {
  return (
    <div className="col m2 xs12 s12 nav-card" >
      <Link to={props.link} activeClassName="active" >
        <div className="card-link">
          <h4>{props.title}</h4>
          <p>{props.description}</p>
        </div>
      </Link>
    </div>
  );
};

NavigationCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
};


export default NavigationCard;
