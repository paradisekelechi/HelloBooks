import React, { PropTypes } from 'react';

const Iterator = (props) => {
  const bookList = (props.bookList).map((book) => {
    return (
      <tr>
        <td>{book.name}</td>
        <td>{book.author}</td>
        <td>{book.description}</td>
        <td>
          {book.deleted ? 'Unavailable' : 'Available'}
        </td>
        <td>
          <button className="btn dark-blue-background">View</button>
        </td>
      </tr>
    );
  });
  return (
    <tbody>
      {bookList}
    </tbody>
  );
};

Iterator.propTypes = {
  bookList: PropTypes.array.isRequired
};
export default Iterator;
