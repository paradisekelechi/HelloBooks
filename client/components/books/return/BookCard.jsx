import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import swal from 'sweetalert2';
import { connect } from 'react-redux';
import * as borrowActions from '../../../actions/BorrowActions';

/**
 *
 *
 * @class BookCard
 * @extends {React.Component}
 */
class BookCard extends React.Component {
  /**
   * Creates an instance of BookCard.
   * @param {any} props
   * @memberof BookCard
   */
  constructor(props) {
    super(props);
    this.state = {
      bookId: ''
    };
  }

  /**
   *
   *@returns {*} sweet alert function
   * @param {any} nextProps
   * @memberof BookCard
   */
  componentWillReceiveProps(nextProps) {
    if (nextProps.return.bookId === this.state.bookId) {
      Materialize.toast(nextProps.return.message, 3000, `${nextProps.return.success ? 'blue' : 'red'} rounded`);
      swal(
        'Return Book!',
        nextProps.return.message,
        nextProps.return.success ? 'success' : 'error'
      ).then(() => {
        window.location.reload();
      });
    }
  }

  /**
   *
   * @returns{Object} dispatch object
   * @param {String} id
   * @memberof BookCard
   */
  returnButtonOnClick(id) {
    this.setState({
      bookId: id
    });
    swal({
      title: 'Do you want to return this book?',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, return it!'
    }).then((result) => {
      if (result.value) {
        this.props.returnBook(id);
      }
    });
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
                      onClick={this.returnButtonOnClick.bind(this, this.props.id)}
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
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    returnBook: (bookId) => {
      dispatch(borrowActions.returnBook(bookId));
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
  id: PropTypes.string.isRequired,
  loggedIn: PropTypes.bool.isRequired,
  return: PropTypes.object.isRequired,
  returnBook: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(BookCard);
