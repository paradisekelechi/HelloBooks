import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import * as bookActions from '../../actions/BookActions';

/**
 * The component for the client user's dashboard
 *
 * @class ClientDashboard
 * @extends {React.Component}
 * @returns {Object} Admin class
 */
class ClientDashboard extends React.Component {
  /**
   *
   * @returns {type} description
   * @memberof AdminDashboard
   */
  componentWillMount() {
    this.props.getAllBooks();
    this.props.getBooksAvailable();
    this.props.getBooksDeleted();
    this.props.getBooksFinished();
  }

  /**
   *
   *
   * @returns  {object} jsx component
   * @memberof AdminDashboard
   */
  render() {
    return (
      <div>
        <div className="row">
          <div className="col m3 s12">
            <div className="card white">
              <div className="card-content ">
                <span className="card-title center">Total Books</span>
                <h4 className="center counter">{this.props.books.total.count}</h4>
              </div>
            </div>
          </div>
          <div className="col m3 s12">
            <div className="card white">
              <div className="card-content ">
                <span className="card-title center">Books Deleted</span>
                <h4 className="center counter">{this.props.books.deleted.count}</h4>
              </div>
            </div>
          </div>
          <div className="col m3 s12">
            <div className="card white">
              <div className="card-content ">
                <span className="card-title center">Books Finished</span>
                <h4 className="center counter">{this.props.books.finished.count}</h4>
              </div>
            </div>
          </div>
          <div className="col m3 s12">
            <div className="card white">
              <div className="card-content">
                <span className="card-title center">Books Available</span>
                <h4 className="center counter">{this.props.books.available.count}</h4>
              </div>
            </div>
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
    },
    getBooksFinished: () => {
      dispatch(bookActions.getBooksFinished());
    },
    getBooksDeleted: () => {
      dispatch(bookActions.getBooksDeleted());
    },
    getBooksAvailable: () => {
      dispatch(bookActions.getBooksAvailable());
    }
  };
};

const mapStateToProps = (state) => {
  return {
    books: state.bookListReducer
  };
};

ClientDashboard.propTypes = {
  getAllBooks: PropTypes.func.isRequired,
  getBooksAvailable: PropTypes.func.isRequired,
  getBooksDeleted: PropTypes.func.isRequired,
  getBooksFinished: PropTypes.func.isRequired,
  books: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(ClientDashboard);
