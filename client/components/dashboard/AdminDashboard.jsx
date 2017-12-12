import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import * as bookActions from '../../actions/bookActions';
import * as userActions from '../../actions/userActions';

/**
 * The component for the admin user's dashboard
 *
 * @class AdminDashboard
 * @extends {React.Component}
 * @returns {Object} Admin class
 */
class AdminDashboard extends React.Component {
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
    this.props.getAllUsers();
    this.props.getAdminUsers();
    this.props.getClientUsers();
    this.props.getDeletedUsers();
  }

  /**
   *
   *
   * @returns  {object} jsx component
   * @memberof AdminDashboard
   */
  render() {
    return (
      <div className="container-fluid">
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

        <div className="row">
          <div className="col m3 s12">
            <div className="card white">
              <div className="card-content">
                <span className="card-title center">Total Users</span>
                <h4 className="center counter">{this.props.users.total.count}</h4>
              </div>
            </div>
          </div>
          <div className="col m3 s12">
            <div className="card blue white">
              <div className="card-content ">
                <span className="card-title center">Deleted Users</span>
                <h4 className="center counter">{this.props.users.deleted.count}</h4>
              </div>
            </div>
          </div>
          <div className="col m3 s12">
            <div className="card white">
              <div className="card-content">
                <span className="card-title center">Client Users</span>
                <h4 className="center counter">{this.props.users.client.count}</h4>
              </div>
            </div>
          </div>
          <div className="col m3 s12">
            <div className="card white">
              <div className="card-content ">
                <span className="card-title center">Admin Users</span>
                <h4 className="center counter">{this.props.users.admin.count}</h4>
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
    },
    getAllUsers: () => {
      dispatch(userActions.getAllUsers());
    },
    getAdminUsers: () => {
      dispatch(userActions.getAdminUsers());
    },
    getClientUsers: () => {
      dispatch(userActions.getClientUsers());
    },
    getDeletedUsers: () => {
      dispatch(userActions.getDeletedUsers());
    }
  };
};

const mapStateToProps = (state) => {
  return {
    users: state.userListReducer,
    books: state.bookListReducer
  };
};

AdminDashboard.propTypes = {
  getAllBooks: PropTypes.func.isRequired,
  getBooksAvailable: PropTypes.func.isRequired,
  getBooksDeleted: PropTypes.func.isRequired,
  getBooksFinished: PropTypes.func.isRequired,
  getAdminUsers: PropTypes.func.isRequired,
  getAllUsers: PropTypes.func.isRequired,
  getClientUsers: PropTypes.func.isRequired,
  getDeletedUsers: PropTypes.func.isRequired,
  books: PropTypes.object.isRequired,
  users: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminDashboard);
