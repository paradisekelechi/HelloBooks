import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as categoryActions from '../../actions/CategoryActions';
import { getSingleBook, editBook } from '../../actions/bookActions';
import notFoundImage from '../../assets/img/not-found.png';

/**
 *
 *
 * @class ViewBook
 * @extends {React.Component}
 */
class ViewBook extends React.Component {
  /**
   * Creates an instance of ViewBook.
   * @param {any} props
   * @memberof ViewBook
   */
  constructor(props) {
    super(props);
    this.state = {
      bookData: {},
      categoryList: [],
      formdata: {}
    };
    this.onChange = this.onChange.bind(this);
    this.onClickSubmit = this.onClickSubmit.bind(this);
    this.uploadWidget = this.uploadWidget.bind(this);
  }

  /**
   *
   *@returns{Object} dispatches actions
   * @memberof ViewBook
   */
  componentWillMount() {
    const bookId = this.props.location.query.id;
    this.props.getBook(bookId);
    this.props.getCategories();
  }
  /**
   *
   *@returns {Object} set state
   * @param {any} nextProps
   * @memberof ViewBook
   */
  componentWillReceiveProps(nextProps) {
    if (
      nextProps.categories || nextProps.bookDetails
    ) {
      this.setState({
        categoryList: nextProps.categories.list,
        bookData: nextProps.bookDetails.book
      });
    }
  }

  /**
   * Generic onChange function
   * @returns {void} returns nothing
   * @param {Object} event
   * @memberof ViewBook
   */
  onChange(event) {
    event.preventDefault();
    const { formdata, bookData } = this.state;
    formdata[event.target.name] = event.target.value;
    Object.assign(bookData, { [event.target.name]: event.target.value });
    this.setState({ formdata, bookData });
  }

  /**
   *
   * @returns {void} description
   * @param {any} event
   * @memberof ViewBook
   */
  onClickSubmit(event) {
    event.preventDefault();
    this.props.editBook(this.state.bookData.id, this.state.formdata);
  }

  /**
   * Upload image
   * @returns {*} upload image
   * @memberof AddBook
   */
  uploadWidget() {
    cloudinary.openUploadWidget(
      { cloud_name: 'skiposki', upload_preset: 'xr19z3b3', tags: ['profile'] },
      (error, result) => {
        if (result) {
          const { formdata } = this.state;
          formdata.bookUrl = result[0].secure_url;
        }
      }
    );
  }

  /**
   *
   *
   * @returns {Object} render object
   * @memberof ViewBook
   */
  render() {
    return (
      <div className="container-fluid main-wrapper">
        <div className="row page-info">
          <div className="col m1"></div>
          <div className="col m10">
            <h5>View Book</h5>
          </div>
        </div>
        <div className="row">
          <div className="col m1"></div>
          <div className="col s12 m3">
            <div className="card">
              <div className="card-image">
                <img
                  alt="bookimage"
                  src={`${
                    this.state.bookData.cover !== 'undefined' ?
                      this.state.bookData.cover :
                      notFoundImage}`}
                />
                <span className="card-title">
                  {this.state.bookData.name ? this.state.bookData.name : 'Book'}
                </span>
                <div
                  onClick={this.uploadWidget}
                  className="btn-floating btn halfway-fab waves-effect waves-light red"
                >
                  <i className="material-icons">edit</i>
                </div>
              </div>
              <div className="card-content">
                <p>{
                  this.state.bookData.description !== 'undefined' ?
                    this.state.bookData.description :
                    'No Book description'
                }
                </p>
              </div>
            </div>
          </div>
          <form onSubmit={this.onClickSubmit}>
            <div className="col m3 s12">
              <div className="row">
                <div className="input-field col s12">
                  <input
                    value={this.state.bookData.name !== 'undefined' ? this.state.bookData.name : ''}
                    id="book_name"
                    type="text"
                    className="validate"
                    disabled
                  />
                  <label className="active" htmlFor="book_name">Book Name</label>
                </div>
              </div>

              <div className="row">
                <div className="input-field col s12">
                  <input
                    value={this.state.bookData.author !== 'undefined' ? this.state.bookData.author : ''}
                    id="book_author"
                    type="text"
                    className="validate"
                    disabled
                  />
                  <label className="active" htmlFor="book_name">Book Author</label>
                </div>
              </div>

              <div className="row">
                <div className="input-field col s12">
                  <input
                    value={this.state.bookData.description !== 'undefined' ? this.state.bookData.description : ''}
                    id="book_description"
                    type="text"
                    className="validate"
                    name="description"
                    onChange={this.onChange}
                  />
                  <label className="active" htmlFor="book_name">Book Description</label>
                </div>
              </div>

            </div>
            <div className="col m3 s12">
              <div className="row">
                <div className="input-field col s12">
                  <input
                    value={this.state.bookData.quantity}
                    id="quantity"
                    type="text"
                    className="validate"
                    name="quantity"
                    onChange={this.onChange}
                  />
                  <label className="active" htmlFor="quantity">Quantity</label>
                </div>
              </div>

              <div className="row">
                <div className="col m12 s12">
                  <label htmlFor="bookCategory">Category</label>
                  <select name="category_id" onChange={this.onChange} className="browser-default">
                    {(this.state.categoryList).map((category) => {
                      const selector = this.state.bookData.category_id === category.id;
                      return (
                        <option selected={selector} value={category.id}>
                          {category.name}
                        </option>);
                    })}
                  </select>
                </div>
              </div>

              <div className="row">
                <div className="input-field col s12">
                  <button
                    className="btn btn-large btn-edit col s12 waves-effect waves-light"
                    type="submit"
                  >
                    Edit Book
                    <i className="material-icons right">send</i>
                  </button>
                </div>
              </div>

            </div>
          </form>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getBook: (bookId) => {
      dispatch(getSingleBook(bookId));
    },
    getCategories: () => {
      dispatch(categoryActions.getCategories());
    },
    editBook: (bookId, formdata) => {
      dispatch(editBook(bookId, formdata));
    }
  };
};

const mapStateToProps = (state) => {
  return {
    bookDetails: state.getSingleBookReducer[0],
    categories: state.getCategoriesReducer[0],
    editBookResponse: state.editBookReducer[0]
  };
};

ViewBook.propTypes = {
  categories: PropTypes.object.isRequired,
  getCategories: PropTypes.func.isRequired,
  bookDetails: PropTypes.object.isRequired,
  getBook: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  editBook: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(ViewBook);
