import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getBooks, getBooksAvailable, getBooksDeleted, getBooksFinished } from '../../actions/Book';
import { getAdminUsers, getAllUsers, getClientUsers, getDeletedUsers } from '../../actions/User';
import { getCategories } from '../../actions/Category';
import DashboardCard from './DashboardCard';
import { getUsertypes } from '../../actions/UserType';
import { getAccountTypes } from '../../actions/AccountType';

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
    this.props.getCategories();
    this.props.getUsertypes();
    this.props.getAccountTypes();
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
          <DashboardCard count={this.props.allBooks.count} title="Total Books" />
          <DashboardCard count={this.props.deletedBooks.count} title="Books Deleted" />
          <DashboardCard count={this.props.finishedBooks.count} title="Books Finished" />
          <DashboardCard count={this.props.availableBooks.count} title="Books Available" />
        </div>
        <div className="row">
          <DashboardCard count={this.props.allUsers.count} title="Total Users" />
          <DashboardCard count={this.props.deletedUsers.count} title="Deleted Users" />
          <DashboardCard count={this.props.clientUsers.count} title="Client Users" />
          <DashboardCard count={this.props.adminUsers.count} title="Admin Users" />
        </div>
        <div className="row">
          <DashboardCard count={this.props.categories.count} title="Book Categories" />
          <DashboardCard count={this.props.usertypes.count} title="Application User Types" />
          <DashboardCard count={this.props.accountTypes.count} title="Application Account Types" />
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
    },
    getCategories: () => {
      dispatch(getCategories());
    },
    getUsertypes: () => {
      dispatch(getUsertypes());
    },
    getAccountTypes: () => {
      dispatch(getAccountTypes());
    },
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
    categories: state.getCategoriesReducer[0],
    usertypes: state.getUsertypesReducer[0],
    accountTypes: state.getAccountTypesReducer[0],
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

  getCategories: PropTypes.func.isRequired,
  categories: PropTypes.object.isRequired,

  getUsertypes: PropTypes.func.isRequired,
  usertypes: PropTypes.object.isRequired,

  getAccountTypes: PropTypes.func.isRequired,
  accountTypes: PropTypes.object.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminDashboard);
