import React from 'react';

const UserTypes = () => {
  return (
    <div className="card white">
      <div className="card-content ">
        <span className="card-title"><h5>User Types</h5></span>
        <table className="responsive-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Level</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>Client</td>
              <td>
                A basic user of the application that borrows
                and returns books in the application
              </td>
              <td>1</td>
            </tr>
            <tr>
              <td>Admin</td>
              <td>
                An admin user of the application that has all the
                necessary priviledges in the application
              </td>
              <td>2</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserTypes;
