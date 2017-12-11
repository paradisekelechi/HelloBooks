import React, { PropTypes } from 'react';
import BookCard from '../common/components/BookCard';

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
          name={book.name}
          author={book.author}
          description={book.description}
          image={book.cover}
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
  bookList: PropTypes.array.isRequired
};
export default BookIterator;
