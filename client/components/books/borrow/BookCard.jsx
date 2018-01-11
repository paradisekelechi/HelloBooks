import React from 'react';
import PropTypes from 'prop-types';
import swal from 'sweetalert2';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { borrowBook } from '../../../actions/Borrow';
import { deleteBook } from '../../../actions/Book';

/**
 *
 *
 * @class BookCard
 * @extends {React.Component}
 */
class BookCard extends React.Component {
  /**
   *Handles the click of the borrow button
   *
   * @returns {void}
   *
   * @param {String} id
   *
   * @memberof BookCard
   */
  borrowButtonOnClick(id) {
    swal({
      title: 'Do you want to borrow this book?',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, borrow it!'
    }).then((result) => {
      if (result.value) {
        this.props.borrowBook(id);
      }
    });
  }

  /**
   *
   * Delete Button On Click
   *
   * @returns {void}
   * @param {String} id
   * @memberof BookCard
   */
  deleteButtonOnClick(id) {
    swal({
      title: 'Do you really want to delete this book?',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        this.props.deleteBook(id);
      }
    });
  }

  /**
   * Render function
   *
   * @returns {Object} render object
   * @memberof BookCard
   */
  render() {
    return (
      <div className="col m3 s12">
        <div className="card  sticky-action small">
          <div className="card-image waves-effect waves-block waves-light">
            <img className="activator" src={this.props.image !== 'undefined' ? this.props.image : '../../../assets/img/noimage.png'} alt="book" />
          </div>
          <div className="card-content">
            <span className="card-title activator grey-text text-darken-4">
              {this.props.name}
              <i className="material-icons right">more_vert</i>
            </span>
            <small>by {this.props.author}</small>
            {
              this.props.loggedIn ?
                (
                  <div>
                    {this.props.userdata.usertype === 1 ?
                      (
                        <button
                          id={`book-borrow-${this.props.id}`}
                          value={this.id}
                          className="btn btn-book"
                          onClick={this.borrowButtonOnClick.bind(this, this.props.id)}
                        >
                          Borrow
                        </button>
                      ) :
                      (
                        <div>
                          <Link to={`/viewbook?id=${this.props.id}`}>
                            <button id={`book-view-${this.props.id}`} className="btn">
                              <i className=" action-buttons material-icons">pageview</i>
                            </button>
                          </Link>
                          <button
                            id={`book-delete-${this.props.id}`}
                            className="btn btn-red"
                            onClick={this.deleteButtonOnClick.bind(this, this.props.id)}
                          >
                            <i className=" action-buttons material-icons">delete</i>
                          </button>
                        </div>
                      )
                    }
                  </div>
                ) :
                (
                  <Link to="/signin">
                    <p><button className="btn">Sign In</button></p>
                  </Link>
                )
            }
          </div>
          <div className="card-reveal">
            <span className="card-title grey-text text-darken-4">
              {this.props.name}
              <i className="material-icons right">close</i>
            </span>
            <p>{this.props.description === 'undefined' ? 'No book description' : this.props.description}</p>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    borrowBook: (bookId) => {
      dispatch(borrowBook(bookId));
    },
    deleteBook: (bookId) => {
      dispatch(deleteBook(bookId));
    }
  };
};

const mapStateToProps = (state) => {
  return {
    borrow: state.borrowBookReducer[0]
  };
};

BookCard.propTypes = {
  name: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  loggedIn: PropTypes.bool.isRequired,
  userdata: PropTypes.object.isRequired,
  borrowBook: PropTypes.func.isRequired,
  deleteBook: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(BookCard);
