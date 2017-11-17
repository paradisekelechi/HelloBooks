import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import * as bookActions from '../../actions/bookActions';
import BookIterator from './ClientBooksIterator';

/**
 * The component for the client books
 *
 * @class ClientBooks
 * @extends {React.Component}
 * @returns {Object} Books class
 */
class ClientBooks extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      booksList: [],
      booksCount: 0
    }
  }
  /**
   *
   * @returns {Object} description
   * @memberof Books
   */
  componentWillMount() {
    this.props.getAllBooks();
    const { state } = this;
    state.booksList = this.props.books.total.list;
    this.setState(state);
  }

  /**
   *
   *
   * @returns  {object} jsx component
   * @memberof Books
   */
  render() {
    return (
      <div>
        <div className="row">
          <div className="col s12 m10 offset-m1 table-box">
            <div className="col s6 m4 offset-m4">
              <input className="align-center" type="text" placeholder="Search for books" />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col s12 m10 offset-m1 table-box">
            <table className="striped highlight">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Author</th>
                  <th>Description</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <BookIterator bookList={this.state.booksList} />
            </table>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getAllBooks: () => {
      dispatch(bookActions.getBooks());
    }
  };
};

const mapStateToProps = (state) => {
  return {
    books: state.bookListReducer
  };
};

ClientBooks.propTypes = {
  getAllBooks: PropTypes.func.isRequired,
  books: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(ClientBooks);
