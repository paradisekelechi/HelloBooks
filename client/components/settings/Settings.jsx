import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCategories, addCategory } from '../../actions/Category';
import Categories from './categories/Categories';
import UserTypes from './usertypes/UserTypes';
import AccountTypes from './accounttypes/AccountTypes';

/**
 * Settings Class
 *
 * @class Settings
 * @extends {React.Component}
 */
class Settings extends React.Component {
  /**
   * Creates an instance of Settings.
   *
   * @param {Object} props
   * @memberof Settings
   */
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      isCategoriesLoading: true,
      shouldAddCategory: false,
      formdata: {}
    };
    this.onChange = this.onChange.bind(this);
    this.handleAddCategory = this.handleAddCategory.bind(this);
    this.handleClickSubmit = this.handleClickSubmit.bind(this);
  }

  /**
   *
   *@returns {void}
   * @memberof Settings
   */
  componentWillMount() {
    this.props.getCategories();
  }

  /**
   * Component Did Mount
   *
   *@returns {void}
   * @memberof Settings
   */
  componentDidMount() {
    document.title = 'HelloBooks | Settings';
    $('.collapsible').collapsible();
  }

  /**
   * Component Will Recieve Props
   *
   *@returns {void}
   * @param {Object} nextProps
   * @memberof Settings
   */
  componentWillReceiveProps(nextProps) {
    if (nextProps.addCategoryState.success) {
      this.props.getCategories();
    }
    this.setState({
      categories: nextProps.categories.list,
      isCategoriesLoading: nextProps.categories.isLoading
    });
  }

  /**
   * Generic onChange function
   *
   * @returns {void}
   * @param {Object} event
   * @memberof ViewBook
   */
  onChange(event) {
    event.preventDefault();
    const { formdata } = this.state;
    formdata[event.target.name] = event.target.value;
    this.setState({ formdata });
  }

  /**
   * Handles the dispalay of the add category form
   *
   *@returns {void} sets shouldAddCategory property of state
   * @memberof Settings
   */
  handleAddCategory() {
    const { shouldAddCategory } = this.state;
    this.setState({
      shouldAddCategory: !shouldAddCategory
    });
  }

  /**
   * Handles the submit of the form to add book category
   *
   * @memberof Settings
   * @returns {void} fires the action to add category
   */
  handleClickSubmit() {
    this.props.addCategory(this.state.formdata);
  }

  /**
   * Render Object
   *
   * @returns {Object} JSX object
   * @memberof Settings
   */
  render() {
    return (
      <div className="container-fluid main-wrapper">
        <div className="row page-info">
          <div className="col m1"></div>
          <div className="col m8">
            <h5>Application Settings</h5>
          </div>
        </div>
        <div className="row">
          <div className="col m1"></div>
          <div className="col s12 m5">
            <UserTypes />
          </div>
          <div className="col s12 m5">
            <AccountTypes />
          </div>
        </div>
        <div className="row">
          <div className="col m1"></div>
          <div className="col s12 m5">
            <div className="card white">
              <div className="card-content ">
                <button
                  onClick={this.handleAddCategory}
                  className="btn btn-floating btn-large waves-effect waves-light right"
                >
                  <i className="material-icons">add</i>
                </button>
                <span className="card-title"><h5>Book Categories</h5></span>
                {this.state.isCategoriesLoading ?
                  (
                    <div className="page-info loader-wrapper">
                      <div id="img4" className="loader img"></div>
                    </div>
                  ) :
                  (
                    <div>
                      {
                        this.state.categories.length === 0 ?
                          'No Categories found' :
                          <Categories list={this.state.categories} />
                      }
                    </div>
                  )
                }
              </div>
            </div>
          </div>
          <div className="col s12 m5">
            {this.state.shouldAddCategory ?
              (
                <div className="card white">
                  <div className="card-content ">
                    <span className="card-title"><h5>Add Book Category</h5></span>
                    <div className="row">
                      <div className="input-field col m6 s12">
                        <input
                          id="category_name"
                          type="text"
                          className="validate"
                          name="name"
                          onChange={this.onChange}
                        />
                        <label className="active" htmlFor="category_name">Name</label>
                      </div>
                      <div className="input-field col m6 s12">
                        <input
                          id="category_abbreviation"
                          type="text"
                          className="validate"
                          name="abbreviation"
                          onChange={this.onChange}
                        />
                        <label
                          className="active"
                          htmlFor="category_abbreviation"
                        >
                          Abbreviation
                        </label>
                      </div>
                    </div>
                    <div className="row">
                      <div className="input-field col s12">
                        <input
                          id="category_description"
                          type="text"
                          className="validate"
                          name="description"
                          onChange={this.onChange}
                        />
                        <label className="active" htmlFor="category_description">Description</label>
                      </div>
                    </div>
                    <div className="row">
                      <div className="input-field col s12 m6">
                        <button
                          className="btn btn-large btn-edit col s12 waves-effect waves-light"
                          type="button"
                          onClick={this.handleClickSubmit}
                        >
                          Add Category
                          <i className="material-icons right">send</i>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ) :
              ''
            }
          </div>
        </div>
      </div >
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getCategories: () => {
      dispatch(getCategories());
    },
    addCategory: (formdata) => {
      dispatch(addCategory(formdata));
    }
  };
};

const mapStateToProps = (state) => {
  return {
    userList: state.getAllUsersReducer[0],
    categories: state.getCategoriesReducer[0],
    addCategoryState: state.addCategoryReducer[0]
  };
};

Settings.propTypes = {
  categories: PropTypes.object.isRequired,
  getCategories: PropTypes.func.isRequired,
  addCategory: PropTypes.func.isRequired,
  addCategoryState: PropTypes.object.isRequired
};
export default connect(mapStateToProps, mapDispatchToProps)(Settings);
