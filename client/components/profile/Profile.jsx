import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import profileImage from '../../assets/img/profile.jpg';
import { authenticateFetch } from '../../helpers/Authentication';
import { getUserType, getAccountType } from '../../helpers/TypeSync';
import { editUserProfileImage, updatePassword } from '../../actions/User';

/**
 * Profile Class
 *
 * @class ProfilePage
 * @extends {React.Component}
 */
class Profile extends React.Component {
  /**
     * Creates an instance of Dashboard.
     *
     * @param {Object} props
     * @memberof Dashboard
     */
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      userType: '',
      accountType: '',
      imageUrl: '',
      userId: '',
      formdata: {
        password: '',
        newPassword: '',
        confirmPassword: ''
      },
      shouldShowForm: false
    };

    this.uploadImage = this.uploadImage.bind(this);
    this.onChange = this.onChange.bind(this);
    this.shouldUpdatePassword = this.shouldUpdatePassword.bind(this);
    this.updatePassword = this.updatePassword.bind(this);
  }

  /**
   * Component Will Mount
  * Check userdetails and determine what to display
  *
  * @returns {*} sets state
  * @memberof Dashboard
  */
  componentWillMount() {
    const loginPayload = authenticateFetch();
    const { userdata } = loginPayload;
    const { state } = this;
    state.userType = getUserType(userdata.usertype);
    state.accountType = getAccountType(userdata.accounttype);
    state.email = userdata.email;
    state.username = userdata.username;
    state.imageUrl = userdata.image;
    state.userId = userdata.userid;
    this.setState(state);
  }

  /**
   * Handles the onChange event of the form inputs
   *
   * @param {Object} event
   * @memberof Profile
   * @returns {void} updates the formdata value of the state
   */
  onChange(event) {
    event.preventDefault();
    const { formdata } = this.state;
    formdata[event.target.name] = event.target.value;
    this.setState({ formdata });
  }

  /**
   * Handles the update of the password
   *
   * @memberof Profile
   *@returns {void}
   */
  updatePassword() {
    const { userId, formdata } = this.state;
    this.props.updatePassword(userId, formdata);
  }

  /**
   * Checks if the update password form should be shown
   *
   * @memberof Profile
   * @returns {void}
   */
  shouldUpdatePassword() {
    this.setState({
      shouldShowForm: !this.state.shouldShowForm
    });
  }

  /**
   * Upload image
   *
   * @returns {void} upload image
   * @memberof Profile
   */
  uploadImage() {
    cloudinary.openUploadWidget(
      { cloud_name: 'skiposki', upload_preset: 'xr19z3b3', tags: ['profile'] },
      (error, result) => {
        if (result) {
          const uploadedImageUrl = result[0].secure_url;
          const { state } = this;
          state.imageUrl = uploadedImageUrl;
          this.setState(state);
          this.props.updateImageUrl(uploadedImageUrl);
        }
      }
    );
  }


  /**
   *
   *
   * @returns {Object} profile image object
   * @memberof ProfilePage
   */
  render() {
    return (
      <div className="container-fluid main-wrapper">
        <div className="row page-info">
          <div className="col m1"></div>
          <div className="col m10">
            <h5>Profile</h5>
          </div>
        </div>
        <div className="row">
          <div className="col m1"></div>
          <div className="col m3 s12">
            <button
              onClick={this.uploadImage}
              className="btn-floating waves-effect dark-blue-background right"
            >
              <i className="material-icons">mode_edit</i>
            </button>
            <img
              id="profile-image"
              className="circle responsive-img"
              alt="profile"
              src={
                this.state.imageUrl === '' || this.state.imageUrl === null ?
                  profileImage :
                  this.state.imageUrl}
              width="100%"
              height="100%"
            />
          </div>
          <div className="col s12 m7">
            <div className="card small">
              <div className="card-image">
                <img src="https://res.cloudinary.com/skiposki/image/upload/v1513072462/user-profile-bg_gghcqw.jpg" alt="profile" className=" responsive-img" />
              </div>
              <div className="card-content">
                <div className="row">
                  <div className="col m1"></div>
                  <div className="col m3 s6">
                    <p>{this.state.username}</p>
                    <span>Username</span>
                  </div>
                  <div className="col m3 s6">
                    <p>{this.state.email}</p>
                    <span>Email</span>
                  </div>
                  <div className="col m3 s6">
                    <p>{this.state.userType}</p>
                    <span>Usertype</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col m4 s12">
                <button
                  id="update-toggle"
                  onClick={this.shouldUpdatePassword}
                  className="btn btn-large btn-edit col s12"
                >
                  Update Password
                </button>
              </div>
              {this.state.shouldShowForm ?
                (
                  <div className="col m5 s12">
                    <div className="row">
                      <div className="input-field col s12">
                        <input
                          id="password"
                          type="password"
                          name="password"
                          className="validate"
                          onChange={this.onChange}
                        />
                        <label className="active" htmlFor="password">Current Password</label>
                      </div>
                    </div>
                    <div className="row">
                      <div className="input-field col s12">
                        <input
                          id="newPassword"
                          type="password"
                          name="newPassword"
                          className="validate"
                          onChange={this.onChange}
                        />
                        <label className="active" htmlFor="newPassword">New Password</label>
                      </div>
                    </div>
                    <div className="row">
                      <div className="input-field col s12">
                        <input
                          id="confirmPassword"
                          type="password"
                          name="confirmPassword"
                          className="validate"
                          onChange={this.onChange}
                        />
                        <label className="active" htmlFor="confirmPassword">Confirm Password</label>
                      </div>
                    </div>
                    <div className="row">
                      <div className="input-field col s12">
                        <button
                          id="save-password"
                          className="btn  waves-effect waves-light"
                          type="button"
                          onClick={this.updatePassword}
                        >
                          Save
                          <i className="material-icons right">send</i>
                        </button>
                      </div>
                    </div>
                  </div>
                ) :
                ''
              }
            </div>
          </div>
        </div>

      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateImageUrl: (imageUrl) => {
      dispatch(editUserProfileImage(imageUrl));
    },
    updatePassword: (userId, formdata) => {
      dispatch(updatePassword(userId, formdata));
    }
  };
};

const mapStateToProps = (state) => {
  return {
    image: state.profileImageReducer[0]
  };
};

Profile.propTypes = {
  updateImageUrl: PropTypes.func.isRequired,
  updatePassword: PropTypes.func.isRequired
};
export default connect(mapStateToProps, mapDispatchToProps)(Profile);
