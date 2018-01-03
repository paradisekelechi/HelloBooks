import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { borrowBook } from '../../../actions/Borrow';
import { deleteBook } from '../../../actions/Book';
import Modal from '../../modals/Modal';

/**
 *
 *
 * @class BookCard
 * @extends {React.Component}
 */
class BookCard extends React.Component {
  /**
   *
   * @returns {void} opens modal
   * @memberof BookCard
   */
  borrowButtonOnClick() {
    $('#borrowBook').modal('open');
  }

  /**
   *
   *@returns {void} triggers book borrow
   * @memberof BookCard
   */
  borrowBook() {
    this.props.borrowBook(this.props.id);
    $('#borrowBook').modal('close');
  }

  /**
   *
   * @returns{Object} dispatch object
   * @memberof BookCard
   */
  deleteButtonOnClick() {
    $('#deleteBook').modal('open');
  }

  /**
   *
   * @returns {void} dispatches action to delete book
   * @memberof BookCard
   */
  deleteBook() {
    this.props.deleteBook(this.props.id);
  }

  /**
   *
   *
   * @returns {Object} render object
   * @memberof BookCard
   */
  render() {
    return (
      <div className="col m3 s12">
        <div className="card  sticky-action small">
          <div className="card-image waves-effect waves-block waves-light">
            <img className="activator" src={this.props.image !== 'undefined' ? this.props.image : 'https://res.cloudinary.com/skiposki/image/upload/v1513075173/image-not-found-4a963b95bf081c3ea02923dceaeb3f8085e1a654fc54840aac61a57a60903fef_rnxyvl.png'} alt="book" />
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
                          value={this.id}
                          className="btn btn-book"
                          onClick={this.borrowButtonOnClick.bind(this)}
                        >
                          Borrow
                        </button>
                      ) :
                      (
                        <div>
                          <Link to={`/viewbook?id=${this.props.id}`}>
                            <button className="btn">
                              <i className=" action-buttons material-icons">pageview</i>
                            </button>
                          </Link>
                          <button
                            className="btn btn-red"
                            onClick={this.deleteButtonOnClick.bind(this)}
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
        <Modal
          modaIId="deleteBook"
          modalTitle="delete book"
          actionTitle="delete"
          prompt="Do you really want to delete this book?"
          action={this.deleteBook.bind(this)}
        />
        <Modal
          modaIId="borrowBook"
          modalTitle="borrow book"
          actionTitle="borrow"
          prompt="Do you really want to borrow this book?"
          action={this.borrowBook.bind(this)}
        />
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
