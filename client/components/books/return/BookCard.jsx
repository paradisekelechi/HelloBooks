import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { returnBook } from '../../../actions/Borrow';
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
   * @returns{Object} dispatch object
   * @memberof BookCard
   */
  returnButtonOnClick() {
    $('#returnBook').modal('open');
  }
  /**
 *
 *@returns {void} opens modal
 * @memberof BookCard
 */
  returnSelectedBook() {
    this.props.returnBook(this.props.id);
    $('#returnBook').modal('close');
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
                  <p>
                    <button
                      value={this.id}
                      className="btn btn-book"
                      onClick={this.returnButtonOnClick.bind(this)}
                    >
                      Return
                    </button>
                  </p>
                ) :
                (
                  <Link to="/signin">
                    <p><button className="btn">Sign In to Return</button></p>
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
          modaIId="returnBook"
          modalTitle="return book"
          actionTitle="return"
          prompt="Do you really want to return this book?"
          action={this.returnSelectedBook.bind(this)}
        />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    returnBook: (bookId) => {
      dispatch(returnBook(bookId));
    }
  };
};

const mapStateToProps = (state) => {
  return {
    return: state.returnBookReducer[0]
  };
};

BookCard.propTypes = {
  name: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  loggedIn: PropTypes.bool.isRequired,
  returnBook: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(BookCard);
