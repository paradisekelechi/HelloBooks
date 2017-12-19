import React from 'react';
import PropTypes from 'prop-types';

const Users = (props) => {
  let userList = '';
  if ((props.list).length > 0) {
    userList = (props.list).map((user) => {
      return (
        <tr key={user.id}>
          <td>{user.username}</td>
          <td>{user.email}</td>
          <td>{user.user_type_id === 1 ? 'Client' : 'Admin'}</td>
          <td>{user.active ? 'Active' : 'Inactive'}</td>
        </tr>
      );
    });
  }
  return (
    <div>
      <h5>Users</h5>
      <table>
        <thead>
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>UserType</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {userList}
        </tbody>
      </table>
    </div>
  );
};

Users.propTypes = {
  list: PropTypes.array.isRequired
};

export default Users;
