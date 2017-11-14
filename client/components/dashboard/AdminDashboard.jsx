import React from 'react';
import { connect } from 'react-redux';
import * as bookActions from '../../actions/BookActions';
import * as userActions from '../../actions/UserActions';

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

        <div className="row">
          <div className="col m6 s12">
            <ul className="collapsible popout" data-collapsible="accordion">
              <li>
                <div className="collapsible-header"><i className="material-icons">person_pin</i>Admin User</div>
                <div className="collapsible-body"><span>Lorem ipsum dolor sit amet.</span></div>
              </li>
              <li>
                <div className="collapsible-header"><i className="material-icons">person_outline</i>Client User</div>
                <div className="collapsible-body"><span>Lorem ipsum dolor sit amet.</span></div>
              </li>
              <li>
                <div className="collapsible-header"><i className="material-icons">person_outline</i>Temporary User</div>
                <div className="collapsible-body"><span>Lorem ipsum dolor sit amet.</span></div>
              </li>
            </ul>
          </div>

          <div className="col m6 s12">
            <ul className="collapsible popout" data-collapsible="accordion">
              <li>
                <div className="collapsible-header"><i className="material-icons">person_outline</i>Platinium Client Account</div>
                <div className="collapsible-body"><span>Lorem ipsum dolor sit amet.</span></div>
              </li>
              <li>
                <div className="collapsible-header"><i className="material-icons">person_outline</i>Gold Client Account</div>
                <div className="collapsible-body"><span>Lorem ipsum dolor sit amet.</span></div>
              </li>
              <li>
                <div className="collapsible-header"><i className="material-icons">person_outline</i>Silver Client Account</div>
                <div className="collapsible-body"><span>Lorem ipsum dolor sit amet.</span></div>
              </li>
            </ul>
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

export default connect(mapStateToProps, mapDispatchToProps)(AdminDashboard);