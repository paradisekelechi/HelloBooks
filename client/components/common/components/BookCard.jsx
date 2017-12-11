import React, { PropTypes } from 'react';

const BookCard = (props) => {
  return (
    <div className="col m3 s12">
      <div className="card  sticky-action small">
        <div className="card-image waves-effect waves-block waves-light">
          <img className="activator" src={props.image} alt="book" />
        </div>
        <div className="card-content">
          <span className="card-title activator grey-text text-darken-4">
            {props.name}
            <i className="material-icons right">more_vert</i>
          </span>
          <small>by {props.author}</small>
        </div>
        <div className="card-reveal">
          <span className="card-title grey-text text-darken-4">
            {props.name}
            <i className="material-icons right">close</i>
          </span>
          <p>{props.description === 'undefined' ? 'No book description' : props.description}</p>
        </div>
      </div>
    </div>
  );
};

BookCard.propTypes = {
  name: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired
};

export default BookCard;
