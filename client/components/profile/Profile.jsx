import React from 'react';
import { connect } from 'react-redux';
import profileImage from '../../assets/img/profile.jpg';
import { authenticateFetch } from '../../utils/Authenticate';
import { getUserType, getAccountType } from '../../utils/TypeSync';
import { editUserProfileImage } from '../../actions/userActions';
import PageBar from '../common/main/PageBar';

/**
 *
 *
 * @class ProfilePage
 * @extends {React.Component}
 */
class Profile extends React.Component {
  /**
     * Creates an instance of Dashboard.
     * @param {any} props
     * @memberof Dashboard
     */
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      userType: '',
      accountType: '',
      imageUrl: ''
    };

    this.uploadWidget = this.uploadWidget.bind(this);
  }

  /**
  * Check userdetails and determine what to display
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
    this.setState(state);
  }

  /**
   * Upload image
   * @returns {*} upload image
   * @memberof Profile
   */
  uploadWidget() {
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
      <div className="col m12">
        <div className="col m8 offset-m4 main-content">
          <PageBar pageName="User Profile" />
          <div className="row profile-strip">
            <div className="col m12 ">
              <div className="col m5 offset-m1 s12">
                <button onClick={this.uploadWidget} className="btn-floating btn-large waves-effect waves-light dark-blue-background right">
                  <i className="material-icons">mode_edit</i>
                </button>
                <img className="profile-image" alt="profile" src={this.state.imageUrl === '' || this.state.imageUrl === null ? profileImage : this.state.imageUrl} height="300px" width="100%" />
              </div>
              <div className="col s12 m6 profile-details dark-blue-text">
                <h5>
                  <b>Username: </b>{this.state.username}
                </h5>
                <h5>
                  <b>Email: </b>{this.state.email}
                </h5>
                <h5>
                  <b>Usertype: </b>{this.state.userType}
                </h5>
                <h5>
                  <b>Account Type: </b>{this.state.accountType}
                </h5>
              </div>
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
    }
  };
};

const mapStateToProps = (state) => {
  return {
    image: state.profileImageReducer[0]
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
