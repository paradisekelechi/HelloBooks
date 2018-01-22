/**
 *  @fileOverview BookCatalog component that loads the books to be displayed
 *
 *  @author Paradise Kelechi
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getPendingBooks } from '../../../actions/Book';
import BookIterator from './BookIterator';
import Navigation from '../../common/UserNavigation';

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
      booksList: [],
      loggedIn: true,
      isLoading: true
    };
  }

  /**
   *
   * @returns {void}
   * @memberof Books
   */
  componentWillMount() {
    this.props.getPendingBooks();
  }
  /**
     * Component Did Mount
     *
     *@returns {void}

     * @memberof BookCatalog
     */
  componentDidMount() {
    document.title = 'HelloBooks | Books';
  }
  /**
   * Component Will Receive Props
   *
   * @returns {void}
   *
   * @param {Object} nextProps
   *
   * @memberof BooksCatalog
   */
  componentWillReceiveProps(nextProps) {
    const { state } = this;
    state.booksList = nextProps.books.list;
    state.isLoading = nextProps.isLoading;
    this.setState(state);
  }

  /**
   * Render function
   *
   * @returns {Object} render object
   *
   * @memberof BooksCatalog
   */
  render() {
    return (
      <div>
        <Navigation />
        <div className="container-fluid main-wrapper">
          <div className="row page-info">
            <div className="col m1" />
            <div className="col m8">
              <h5>Borrow History</h5>
            </div>
          </div>
          <div className="row">
            <div className="col m1" />
            {this.state.isLoading ? (
              <div className="col m6 offset-m2 page-info loader-wrapper">
                <div id="img4" className="loader img" />
              </div>
            ) : (
              <div>
                {this.state.booksList.length === 0 ? (
                  <div className="col m6 offset-m2 page-info not-found">
                    <h5>No Pending Borrow Available</h5>
                  </div>
                ) : (
                  <div className=" col m10 books-wrapper">
                    <BookIterator borrowLog={this.state.booksList} loggedIn={this.state.loggedIn} />
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getPendingBooks: () => {
      dispatch(getPendingBooks());
    }
  };
};

const mapStateToProps = (state) => {
  return {
    books: state.pendingBooksReducer[0]
  };
};

BooksCatalog.propTypes = {
  books: PropTypes.object.isRequired,
  getPendingBooks: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(BooksCatalog);
