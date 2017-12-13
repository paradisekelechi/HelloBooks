import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import profileImage from '../../assets/img/profile.jpg';
import { authenticateFetch } from '../../utils/authenticate';
import { getUserType, getAccountType } from '../../utils/TypeSync';
import { editUserProfileImage } from '../../actions/userActions';

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
      <div className="container-fluid main-wrapper">
        <div className="row page-info">
          <div className="col m1"></div>
          <div className="col m10">
            <h5>HelloBooks Profile</h5>
          </div>
        </div>
        <div className="row">
          <div className="col m1"></div>
          <div className="col s12 m10">
            <div className="card medium">
              <div className="card-image">
                <img src="https://res.cloudinary.com/skiposki/image/upload/v1513072462/user-profile-bg_gghcqw.jpg" alt="profile" className=" responsive-img" />
              </div>
              <div className="card-content">
                <div className="row">
                  <div className="col m2 s12">
                    <button
                      onClick={this.uploadWidget}
                      className="btn-floating waves-effect dark-blue-background right"
                    >
                      <i className="material-icons">mode_edit</i>
                    </button>
                    <img
                      className="circle responsive-img"
                      alt="profile"
                      src={
                        this.state.imageUrl === '' || this.state.imageUrl === null ?
                          profileImage :
                          this.state.imageUrl}
                      width="85%"
                    />
                  </div>
                  <div className="col m1"></div>
                  <div className="col m3 s12">
                    <p>{this.state.username}</p>
                    <span>Username</span>
                  </div>
                  <div className="col m3 s12">
                    <p>{this.state.email}</p>
                    <span>Email</span>
                  </div>
                  <div className="col m3 s12">
                    <p>{this.state.userType}</p>
                    <span>Usertype</span>
                  </div>
                </div>
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

Profile.propTypes = {
  updateImageUrl: PropTypes.func.isRequired
};
export default connect(mapStateToProps, mapDispatchToProps)(Profile);
