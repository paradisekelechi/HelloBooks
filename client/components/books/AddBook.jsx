/**
 *  @fileOverview AddBook component shows the view to add a book
 *
 *  @author Paradise Kelechi
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCategories } from '../../actions/Category';
import { addBook } from '../../actions/Book';
import Navigation from '../common/UserNavigation';

/**
 *
 *
 * @class AddBook
 * @extends {React.Component}
 */
class AddBook extends React.Component {
  /**
   * Creates an instance of AddBook.
   * @param {any} props
   * @memberof AddBook
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
   * @memberof AddBook
   */
  componentWillMount() {
    this.props.getCategories();
  }
  /**
  *
  *@returns {*} set title
  * @memberof AddBook
  */
  componentDidMount() {
    document.title = 'HelloBooks | Book';
  }
  /**
   *
   *@returns {Object} set state
   * @param {any} nextProps
   * @memberof AddBook
   */
  componentWillReceiveProps(nextProps) {
    this.setState({
      categoryList: nextProps.categories.list,
    });
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
   *Handle submit on click

   * @returns {void}
   * @param {Object} event
   * @memberof ViewBook
   */
  onClickSubmit(event) {
    event.preventDefault();
    this.props.addBook(this.state.bookData.id, this.state.formdata);
  }

  /**
   * Upload image function
   *
   * @returns {void}
   * @memberof AddBook
   */
  uploadWidget() {
    cloudinary.openUploadWidget(
      { cloud_name: 'skiposki', upload_preset: 'xr19z3b3', tags: ['profile'] },
      (error, result) => {
        if (result) {
          const { formdata } = this.state;
          formdata.image = result[0].secure_url;
        }
      }
    );
  }

  /**
   * Render function
   *
   * @returns {Object} render object
   * @memberof ViewBook
   */
  render() {
    return (
      <div>
        <Navigation />
        <div className="container-fluid main-wrapper">
          <div className="row page-info">
            <div className="col m1"></div>
            <div className="col m10">
              <h5>Add Book</h5>
            </div>
          </div>
          <div className="row">
            <div className="col m1"></div>
            <div className="col s12 m3">
              <button
                onClick={this.uploadWidget}
                className="btn btn-large"
              >
                Upload Book Cover
              </button>
            </div>
            <form onSubmit={this.onClickSubmit}>
              <div className="col m3 s12">
                <div className="row">
                  <div className="input-field col s12">
                    <input
                      id="book_name"
                      type="text"
                      className="validate"
                      name="name"
                      onChange={this.onChange}
                    />
                    <label className="active" htmlFor="book_name">Book Name</label>
                  </div>
                </div>

                <div className="row">
                  <div className="input-field col s12">
                    <input
                      id="book_author"
                      type="text"
                      name="author"
                      className="validate"
                      onChange={this.onChange}
                    />
                    <label className="active" htmlFor="book_name">Book Author</label>
                  </div>
                </div>

                <div className="row">
                  <div className="input-field col s12">
                    <input
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
                    <select name="categoryId" onChange={this.onChange} className="browser-default">
                      <option>Choose Category</option>
                      {(this.state.categoryList).map((category) => {
                        return (
                          <option key={category.id} value={category.id}>
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
                      Add Book
                      <i className="material-icons right">send</i>
                    </button>
                  </div>
                </div>

              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getCategories: () => {
      dispatch(getCategories());
    },
    addBook: (bookId, formdata) => {
      dispatch(addBook(bookId, formdata));
    }
  };
};

const mapStateToProps = (state) => {
  return {
    categories: state.getCategoriesReducer[0],
    addBookResponse: state.addBookReducer[0]
  };
};

AddBook.propTypes = {
  categories: PropTypes.object.isRequired,
  getCategories: PropTypes.func.isRequired,
  addBook: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddBook);
