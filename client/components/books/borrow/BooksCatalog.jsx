import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { getBooksAvailable } from '../../../actions/Book';
import { getCategories } from '../../../actions/Category';
import { authenticateFetch } from '../../../helpers/Authentication';
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
      userdata: {},
      isLoading: true
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
    *@returns {*} set title
    * @memberof BookCatalog
    */
  componentDidMount() {
    document.title = 'HelloBooks | Books';
  }
  /**
   *
   * @returns {*} executes an action
   * @param {any} nextProps
   * @memberof BooksCatalog
   */
  componentWillReceiveProps(nextProps) {
    const { state } = this;
    state.isLoading = nextProps.isLoading;
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
   * Render object
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
          {this.state.isLoading ?
            (
              <div className="col m6 offset-m2 s12 page-info loader-wrapper">
                <div id="img4" className="loader img"></div>
              </div>
            ) :
            (
              <div>
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
      dispatch(getBooksAvailable());
    },
    getCategories: () => {
      dispatch(getCategories());
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
  isLoading: PropTypes.bool.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(BooksCatalog);
