import React from 'react';

const AccountTypes = () => {
  return (
    <div className="card white">
      <div className="card-content ">
        <span className="card-title"><h5>Account Types</h5></span>
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
              <td>Silver</td>
              <td>A new user of the application</td>
              <td>1</td>
            </tr>
            <tr>
              <td>Gold</td>
              <td>An advanced user of the application</td>
              <td>2</td>
            </tr>
            <tr>
              <td>Platinium</td>
              <td>The highest user of the application with the highest priviledges</td>
              <td>3</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AccountTypes;
