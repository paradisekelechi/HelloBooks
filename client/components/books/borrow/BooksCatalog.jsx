import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import * as bookActions from '../../../actions/bookActions';
import * as categoryActions from '../../../actions/CategoryActions';
import { authenticateFetch } from '../../../utils/authenticate';
import BookIterator from './BookIterator';

/**
 *
 *
 * @class BooksCatalog
 * @extends {React.Component}
 * @returns {Object} react component
 */
class BooksCatalog extends React.Component {
  /**
   * Creates an instance of BooksCatalog.
   * @param {any} props
   * @memberof BooksCatalog
   */
  constructor(props) {
    super(props);
    this.state = {
      category: 0,
      booksList: [],
      categoryList: [],
      loggedIn: true,
      userdata: {}
    };
    this.selectOnChange = this.selectOnChange.bind(this);
  }

  /**
   *
   * @returns {Object} description
   * @memberof Books
   */
  componentWillMount() {
    const { loggedIn, userdata } = authenticateFetch();
    this.setState({
      loggedIn,
      userdata
    });
    this.props.getAvailableBooks(this.state.category);
    this.props.getCategories();
  }

  /**
   *
   * @returns {*} executes an action
   * @param {any} nextProps
   * @memberof BooksCatalog
   */
  componentWillReceiveProps(nextProps) {
    const { state } = this;
    state.booksList = nextProps.books.list;
    state.categoryList = nextProps.categories.list;
    this.setState(state);
  }

  /**
  *
  *
  * @param {Object} event
  * @memberof BooksCatalog
  * @returns {*} set state
  */
  selectOnChange(event) {
    event.preventDefault();
    this.setState({
      category: event.target.value
    });
  }

  /**
   *
   *
   * @returns {Object} render object
   * @memberof BooksCatalog
   */
  render() {
    return (
      <div className="container-fluid main-wrapper">
        <div className="row page-info">
          <div className="col m1"></div>
          <div className="col m8">
            <h5>Book Catalog</h5>
          </div>
          <div className="col m2 s12">
            {(this.state.userdata.usertype === 2) ?
              (
                <Link to="/addbook">
                  <button className="btn btn-floating btn-large waves-effect waves-light right">
                    <i className="material-icons">add</i>
                  </button>
                </Link>
              ) :
              (<div></div>)}
          </div>
        </div>
        <div className="row">
          <div className="col m1"></div>
          {this.state.booksList.length === 0 ?
            (
              <div
                className="col m6 offset-m2 page-info not-found"
              >
                <h5>No Books Available</h5>
              </div>
            ) :
            (
              <div className=" col m10 books-wrapper">
                <BookIterator
                  bookList={this.state.booksList}
                  loggedIn={this.state.loggedIn}
                  userdata={this.state.userdata}
                />
              </div>
            )
          }
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getAvailableBooks: () => {
      dispatch(bookActions.getBooksAvailable());
    },
    getCategories: () => {
      dispatch(categoryActions.getCategories());
    }
  };
};

const mapStateToProps = (state) => {
  return {
    books: state.availableBooksReducer[0],
    categories: state.getCategoriesReducer[0]
  };
};

BooksCatalog.propTypes = {
  books: PropTypes.object.isRequired,
  getAvailableBooks: PropTypes.func.isRequired,
  categories: PropTypes.object.isRequired,
  getCategories: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(BooksCatalog);
