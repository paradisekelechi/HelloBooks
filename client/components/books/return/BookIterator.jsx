/**
 *  @fileOverview BookIterator component that loops through the list of books
 *
 *  @author Paradise Kelechi
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import BookCard from './BookCard';

/**
 * BookIterator function
 *
 * @param {Object} props
 *@returns {void}
 */
const BookIterator = (props) => {
  let bookList = () => {
    return <h5>No books found!</h5>;
  };
  if (props.borrowLog.length > 0) {
    bookList = props.borrowLog.map((log) => {
      return (
        <BookCard
          key={log.Book.id}
          name={log.Book.name}
          author={log.Book.author}
          description={log.Book.description}
          image={log.Book.cover}
          id={log.Book.id}
          loggedIn={props.loggedIn}
        />
      );
    });
  }

  return <div>{bookList}</div>;
};

BookIterator.propTypes = {
  borrowLog: PropTypes.array.isRequired,
  loggedIn: PropTypes.bool.isRequired
};
export default BookIterator;
