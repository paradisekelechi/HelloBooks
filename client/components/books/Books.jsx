import React from 'react';
import BooksSync from './BooksSync';
import { authenticateFetch } from '../../utils/authenticate';
import { getUserType, getAccountType } from '../../utils/TypeSync';


/**
 *
 *
 * @class Books
 * @extends {React.Component}
 */
class Books extends React.Component {
  /**
     * Creates an instance of Dashboard.
     * @param {any} props
     * @memberof Dashboard
     */
  constructor(props) {
    super(props);
    this.state = {
      userType: 'CLIENT',
      accountType: 'SILVER'
    };
  }
  /**
   * Check usertype and determine what to display
   * @returns {*} sets state
   * @memberof Books
   */
  componentWillMount() {
    const loginPayload = authenticateFetch();
    const { userdata } = loginPayload;
    const { state } = this;
    state.userType = getUserType(userdata.usertype);
    state.accountType = getAccountType(userdata.accounttype);
    this.setState(state);
  }

  /**
 * render method
 * @returns {*} value
 * @memberof Books
 */
  render() {
    return (
      <div>
        <BooksSync userType={this.state.userType} />
      </div>
    );
  }
}

export default Books;
