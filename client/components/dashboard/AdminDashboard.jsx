import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getBooks, getBooksAvailable, getBooksDeleted, getBooksFinished } from '../../actions/Book';
import { getAdminUsers, getAllUsers, getClientUsers, getDeletedUsers } from '../../actions/User';

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
                <h4 className="center counter">{this.props.allBooks.count}</h4>
              </div>
            </div>
          </div>
          <div className="col m3 s12">
            <div className="card white">
              <div className="card-content ">
                <span className="card-title center">Books Deleted</span>
                <h4 className="center counter">{this.props.deletedBooks.count}</h4>
              </div>
            </div>
          </div>
          <div className="col m3 s12">
            <div className="card white">
              <div className="card-content ">
                <span className="card-title center">Books Finished</span>
                <h4 className="center counter">{this.props.finishedBooks.count}</h4>
              </div>
            </div>
          </div>
          <div className="col m3 s12">
            <div className="card white">
              <div className="card-content">
                <span className="card-title center">Books Available</span>
                <h4 className="center counter">{this.props.availableBooks.count}</h4>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col m3 s12">
            <div className="card white">
              <div className="card-content">
                <span className="card-title center">Total Users</span>
                <h4 className="center counter">{this.props.allUsers.count}</h4>
              </div>
            </div>
          </div>
          <div className="col m3 s12">
            <div className="card blue white">
              <div className="card-content ">
                <span className="card-title center">Deleted Users</span>
                <h4 className="center counter">{this.props.deletedUsers.count}</h4>
              </div>
            </div>
          </div>
          <div className="col m3 s12">
            <div className="card white">
              <div className="card-content">
                <span className="card-title center">Client Users</span>
                <h4 className="center counter">{this.props.clientUsers.count}</h4>
              </div>
            </div>
          </div>
          <div className="col m3 s12">
            <div className="card white">
              <div className="card-content ">
                <span className="card-title center">Admin Users</span>
                <h4 className="center counter">{this.props.adminUsers.count}</h4>
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
      dispatch(getBooks());
    },
    getBooksFinished: () => {
      dispatch(getBooksFinished());
    },
    getBooksDeleted: () => {
      dispatch(getBooksDeleted());
    },
    getBooksAvailable: () => {
      dispatch(getBooksAvailable());
    },
    getAllUsers: () => {
      dispatch(getAllUsers());
    },
    getAdminUsers: () => {
      dispatch(getAdminUsers());
    },
    getClientUsers: () => {
      dispatch(getClientUsers());
    },
    getDeletedUsers: () => {
      dispatch(getDeletedUsers());
    }
  };
};

const mapStateToProps = (state) => {
  return {
    deletedBooks: state.getDeletedBooksReducer[0],
    finishedBooks: state.getFinishedBooksReducer[0],
    availableBooks: state.getAvailableBooksReducer[0],
    allBooks: state.getBooksReducer[0],
    allUsers: state.getAllUsersReducer[0],
    adminUsers: state.getAdminUsersReducer[0],
    clientUsers: state.getClientUsersReducer[0],
    deletedUsers: state.getDeletedUsersReducer[0],
  };
};

AdminDashboard.propTypes = {
  getAllBooks: PropTypes.func.isRequired,
  allBooks: PropTypes.object.isRequired,
  getBooksAvailable: PropTypes.func.isRequired,
  availableBooks: PropTypes.object.isRequired,
  getBooksDeleted: PropTypes.func.isRequired,
  deletedBooks: PropTypes.object.isRequired,
  getBooksFinished: PropTypes.func.isRequired,
  finishedBooks: PropTypes.object.isRequired,

  getAdminUsers: PropTypes.func.isRequired,
  adminUsers: PropTypes.object.isRequired,
  getAllUsers: PropTypes.func.isRequired,
  allUsers: PropTypes.object.isRequired,
  getClientUsers: PropTypes.func.isRequired,
  clientUsers: PropTypes.object.isRequired,
  getDeletedUsers: PropTypes.func.isRequired,
  deletedUsers: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminDashboard);
