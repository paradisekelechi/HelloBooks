import chai from 'chai';
import supertest from 'supertest';
import app from '../../app';
import {
  username,
  email,
  password
} from './TestData';
import routes from '../../tools/Routes';

const {
  assert
} = chai;
const {
  signin,
  signup,
  getAllUsers,
  getAdminUsers,
  getClientUsers,
  getDeletedUsers,
  editUser,
  deleteUser
} = routes;
const adminToken = process.env.ADMINTOKEN;
let userToken = process.env.USERTOKEN;
const request = supertest(app);
let totalUsers;

describe('Signup Route', () => {
  it('should be able to signup', (done) => {
    request
      .post(signup)
      .send({
        username,
        password,
        email
      })
      .end((err, res) => {
        assert.exists(res.status);
        assert.exists(res.body.success);
        assert.exists(res.body.message);
        assert.exists(res.body.token);
        assert.equal(res.status, 200);
        assert.equal(res.body.success, true);
        assert.equal(res.body.message, 'User Account Creation Successful');
        assert.equal(res.body.username, username);
        assert.equal(res.body.email, email);
        userToken = res.body.token;
        done();
      });
  });

  it('should not be able to signup: missing username', (done) => {
    request
      .post(signup)
      .send({
        password,
        email
      })
      .end((err, res) => {
        assert.exists(res.status);
        assert.exists(res.body.success);
        assert.exists(res.body.message);
        assert.equal(res.status, 401);
        assert.equal(res.body.success, false);
        assert.equal(res.body.message, 'Username is required');
        done();
      });
  });

  it('should not be able to signup: missing password', (done) => {
    request
      .post(signup)
      .send({
        username,
        email
      })
      .end((err, res) => {
        assert.exists(res.status);
        assert.exists(res.body.success);
        assert.exists(res.body.message);
        assert.equal(res.status, 401);
        assert.equal(res.body.success, false);
        assert.equal(res.body.message, 'Password is required');
        done();
      });
  });

  it('should not be able to signup: missing email', (done) => {
    request
      .post(signup)
      .send({
        username,
        password
      })
      .end((err, res) => {
        assert.exists(res.status);
        assert.exists(res.body.success);
        assert.exists(res.body.message);
        assert.equal(res.status, 401);
        assert.equal(res.body.success, false);
        assert.equal(res.body.message, 'Email is required');
        done();
      });
  });
});

describe('Signin Route', () => {
  it('should be able to signin', (done) => {
    request
      .post(signin)
      .send({
        username,
        password
      })
      .end((err, res) => {
        assert.exists(res.status);
        assert.exists(res.body.success);
        assert.exists(res.body.token);
        assert.exists(res.body.message);
        assert.exists(res.body.accounttype);
        assert.equal(res.body.success, true);
        assert.equal(res.body.message, 'User successfully signed in ');
        assert.equal(res.body.username, username);
        assert.equal(res.status, 200);
        done();
      });
  });

  it('should not be able to signin: missing username', (done) => {
    request
      .post(signin)
      .send({
        password
      })
      .end((err, res) => {
        assert.exists(res.status);
        assert.exists(res.body.success);
        assert.exists(res.body.message);
        assert.equal(res.body.success, false);
        assert.equal(res.body.message, 'Username is required');
        assert.equal(res.status, 401);
        done();
      });
  });

  it('should not be able to signin: missing password', (done) => {
    request
      .post(signin)
      .send({
        username
      })
      .end((err, res) => {
        assert.exists(res.status);
        assert.exists(res.body.success);
        assert.exists(res.body.message);
        assert.equal(res.body.success, false);
        assert.equal(res.body.message, 'Password is required');
        assert.equal(res.status, 401);
        done();
      });
  });
});


describe('Get Users', () => {
  it('should get all users', (done) => {
    request
      .get(getAllUsers)
      .set('user-token', adminToken)
      .end((err, res) => {
        assert.exists(res.status);
        assert.exists(res.body.message);
        assert.exists(res.body.success);
        assert.exists(res.body.users);
        assert.exists(res.body.users.count);
        assert.exists(res.body.users.rows);
        assert.equal(res.status, 200);
        assert.equal(res.body.message, 'Users list successfully gotten ');
        assert.equal(res.body.success, true);
        assert.isArray(res.body.users.rows);
        totalUsers = res.body.users.count;
        done();
      });
  });

  it('should not get all users', (done) => {
    request
      .get(getAllUsers)
      .end((err, res) => {
        assert.exists(res.status);
        assert.exists(res.body.message);
        assert.exists(res.body.success);
        assert.equal(res.status, 401);
        assert.equal(res.body.message, 'User token is not provided');
        assert.equal(res.body.success, false);
        done();
      });
  });

  it('should not get all users', (done) => {
    request
      .get(getAllUsers)
      .set('user-token', userToken)
      .end((err, res) => {
        assert.exists(res.status);
        assert.exists(res.body.message);
        assert.exists(res.body.success);
        assert.equal(res.status, 401);
        assert.equal(res.body.message, 'User not authorized');
        assert.equal(res.body.success, false);
        done();
      });
  });
});


describe('Get Admin Users', () => {
  it('should get admin users', (done) => {
    request
      .get(getAdminUsers)
      .set('user-token', adminToken)
      .end((err, res) => {
        assert.exists(res.status);
        assert.exists(res.body.message);
        assert.exists(res.body.success);
        assert.exists(res.body.users);
        assert.exists(res.body.users.count);
        assert.exists(res.body.users.rows);
        assert.equal(res.status, 200);
        assert.equal(res.body.message, 'Users list successfully gotten ');
        assert.equal(res.body.success, true);
        assert.isArray(res.body.users.rows);
        done();
      });
  });

  it('should not get admin users', (done) => {
    request
      .get(getAdminUsers)
      .end((err, res) => {
        assert.exists(res.status);
        assert.exists(res.body.message);
        assert.exists(res.body.success);
        assert.equal(res.status, 401);
        assert.equal(res.body.message, 'User token is not provided');
        assert.equal(res.body.success, false);
        done();
      });
  });

  it('should not get admin users', (done) => {
    request
      .get(getAdminUsers)
      .set('user-token', userToken)
      .end((err, res) => {
        assert.exists(res.status);
        assert.exists(res.body.message);
        assert.exists(res.body.success);
        assert.equal(res.status, 401);
        assert.equal(res.body.message, 'User not authorized');
        assert.equal(res.body.success, false);
        done();
      });
  });
});


describe('Get Client Users', () => {
  it('should get client users', (done) => {
    request
      .get(getClientUsers)
      .set('user-token', adminToken)
      .end((err, res) => {
        assert.exists(res.status);
        assert.exists(res.body.message);
        assert.exists(res.body.success);
        assert.exists(res.body.users);
        assert.exists(res.body.users.count);
        assert.exists(res.body.users.rows);
        assert.equal(res.status, 200);
        assert.equal(res.body.message, 'Users list successfully gotten ');
        assert.equal(res.body.success, true);
        assert.isArray(res.body.users.rows);
        done();
      });
  });

  it('should not get client users', (done) => {
    request
      .get(getClientUsers)
      .end((err, res) => {
        assert.exists(res.status);
        assert.exists(res.body.message);
        assert.exists(res.body.success);
        assert.equal(res.status, 401);
        assert.equal(res.body.message, 'User token is not provided');
        assert.equal(res.body.success, false);
        done();
      });
  });

  it('should not get client users', (done) => {
    request
      .get(getClientUsers)
      .set('user-token', userToken)
      .end((err, res) => {
        assert.exists(res.status);
        assert.exists(res.body.message);
        assert.exists(res.body.success);
        assert.equal(res.status, 401);
        assert.equal(res.body.message, 'User not authorized');
        assert.equal(res.body.success, false);
        done();
      });
  });
});

describe('Get Deleted Users', () => {
  it('should get deleted users', (done) => {
    request
      .get(getDeletedUsers)
      .set('user-token', adminToken)
      .end((err, res) => {
        assert.exists(res.status);
        assert.exists(res.body.message);
        assert.exists(res.body.success);
        assert.exists(res.body.users);
        assert.exists(res.body.users.count);
        assert.exists(res.body.users.rows);
        assert.equal(res.status, 200);
        assert.equal(res.body.message, 'Users list successfully gotten ');
        assert.equal(res.body.success, true);
        assert.isArray(res.body.users.rows);
        done();
      });
  });

  it('should not get deleted users', (done) => {
    request
      .get(getDeletedUsers)
      .end((err, res) => {
        assert.exists(res.status);
        assert.exists(res.body.message);
        assert.exists(res.body.success);
        assert.equal(res.status, 401);
        assert.equal(res.body.message, 'User token is not provided');
        assert.equal(res.body.success, false);
        done();
      });
  });

  it('should not get deleted users', (done) => {
    request
      .get(getDeletedUsers)
      .set('user-token', userToken)
      .end((err, res) => {
        assert.exists(res.status);
        assert.exists(res.body.message);
        assert.exists(res.body.success);
        assert.equal(res.status, 401);
        assert.equal(res.body.message, 'User not authorized');
        assert.equal(res.body.success, false);
        done();
      });
  });
});

describe('Edit User Route', () => {
  it('should edit user', (done) => {
    request
      .put(`${editUser}/1`)
      .set('user-token', userToken)
      .send({
        imageUrl: 'imageUrl'
      })
      .end((err, res) => {
        assert.exists(res.status);
        assert.exists(res.body.success);
        assert.exists(res.body.message);
        assert.equal(res.status, 200);
        assert.equal(res.body.success, true);
        assert.equal(res.body.message, 'User successfully updated');
        done();
      });
  });

  it('should not edit user', (done) => {
    request
      .put(`${editUser}/1`)
      .set('user-token', userToken)
      .end((err, res) => {
        assert.exists(res.status);
        assert.exists(res.body.success);
        assert.exists(res.body.message);
        assert.equal(res.status, 400);
        assert.equal(res.body.success, false);
        assert.equal(res.body.message, 'No data to edit');
        done();
      });
  });
});


describe('Delete User Route', () => {
  it('should delete a user', (done) => {
    request
      .put(`${deleteUser}/${totalUsers}`)
      .set('user-token', adminToken)
      .end((err, res) => {
        assert.exists(res.status);
        assert.exists(res.body.success);
        assert.exists(res.body.message);
        assert.equal(res.status, 200);
        assert.equal(res.body.success, true);
        assert.equal(res.body.message, 'User successfully deleted');
        done();
      });
  });
});
