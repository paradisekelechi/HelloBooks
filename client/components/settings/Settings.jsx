import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getAllUsers } from '../../actions/User';
import { getCategories } from '../../actions/Category';
import Users from './users/Users';
import Categories from './categories/Categories';

/**
 *
 *
 * @class Settings
 * @extends {React.Component}
 */
class Settings extends React.Component {
  /**
   * Creates an instance of Settings.
   * @param {any} props
   * @memberof Settings
   */
  constructor(props) {
    super(props);
    this.state = {
      usersList: [],
      categories: []
    };
  }

  /**
   *
   *@returns {*} get props
   * @memberof Settings
   */
  componentWillMount() {
    this.props.getAllUsers();
    this.props.getCategories();
  }

  /**
   *
   *@returns {*} Add page title
   * @memberof Settings
   */
  componentDidMount() {
    document.title = 'HelloBooks | Settings';
  }

  /**
   *
   *@returns {Object} set state
   * @param {any} nextProps
   * @memberof Settings
   */
  componentWillReceiveProps(nextProps) {
    this.setState({
      usersList: nextProps.userList.list,
      categories: nextProps.categories.list
    });
  }

  /**
   *
   *
   * @returns {Object} render object
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
          <div className="col m10">
            {
              this.state.usersList.length === 0 ?
                'No users found' :
                <Users list={this.state.usersList} />
            }
          </div>
        </div>
        <div className="row">
          <div className="col m1"></div>
          <div className="col m10">
            {
              this.state.categories.length === 0 ?
                'No Categories found' :
                <Categories list={this.state.categories} />
            }
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getAllUsers: () => {
      dispatch(getAllUsers());
    },
    getCategories: () => {
      dispatch(getCategories());
    },
  };
};

const mapStateToProps = (state) => {
  return {
    userList: state.getAllUsersReducer[0],
    categories: state.getCategoriesReducer[0],
  };
};

Settings.propTypes = {
  userList: PropTypes.object.isRequired,
  categories: PropTypes.object.isRequired,
  getAllUsers: PropTypes.func.isRequired,
  getCategories: PropTypes.func.isRequired
};
export default connect(mapStateToProps, mapDispatchToProps)(Settings);
