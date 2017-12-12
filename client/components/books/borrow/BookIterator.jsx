import React, { PropTypes } from 'react';
import BookCard from './BookCard';

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
