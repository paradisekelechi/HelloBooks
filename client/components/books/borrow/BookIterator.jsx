import React from 'react';
import PropTypes from 'prop-types';
import BookCard from './BookCard';

/**
 *
 * @param {Object} props
 *
 * @returns {Object} Jsx object
 */
const BookIterator = (props) => {
  let bookList = () => {
    return (
      <h5>No books found!</h5>
    );
  };
  if ((props.bookList).length > 0) {
    bookList = (props.bookList).map((book) => {
      return (
        <BookCard
          key={book.id}
          name={book.name}
          author={book.author}
          description={book.description}
          image={book.cover}
          id={book.id}
          loggedIn={props.loggedIn}
          userdata={props.userdata}
        />
      );
    });
  }

  return (
    <div>
      {bookList}
    </div>
  );
};

BookIterator.propTypes = {
  bookList: PropTypes.array.isRequired,
  loggedIn: PropTypes.bool.isRequired,
  userdata: PropTypes.object.isRequired
};
export default BookIterator;
