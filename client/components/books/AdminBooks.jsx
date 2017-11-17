import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import * as bookActions from '../../actions/bookActions';

/**
 * The component for the admin books
 *
 * @class AdminBooks
 * @extends {React.Component}
 * @returns {Object} Books class
 */
class AdminBooks extends React.Component {
  /**
   *
   * @returns {type} description
   * @memberof Books
   */
  componentWillMount() {
    this.props.getAllBooks();
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
        <table>
          <thead>
            <tr>
              <th>S/N</th>
              <th>Book Name</th>
              <th>Book Author</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>Alvin</td>
              <td>Eclair</td>
              <td>$0.87</td>
            </tr>
            <tr>
              <td>Alan</td>
              <td>Jellybean</td>
              <td>$3.76</td>
            </tr>
            <tr>
              <td>Jonathan</td>
              <td>Lollipop</td>
              <td>$7.00</td>
            </tr>
          </tbody>
        </table>
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

AdminBooks.propTypes = {
  getAllBooks: PropTypes.func.isRequired,
  books: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminBooks);
