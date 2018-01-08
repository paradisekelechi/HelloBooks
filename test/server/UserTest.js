/**
 *  @fileOverview Test file for user related routes
 *
 *  @author Paradise Kelechi
 *
 * @requires NPM:chai
 * @requires NPM:supertest
 * @requires ../../app
 * @requires ../../tools/Routes
 * @requires ./TestData
 */

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
  googleSignin,
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
      });
    done();
  });

  it('should not be able to signup: already existing username', (done) => {
    request
      .post(signup)
      .send({
        username,
        password,
        email: `${email}test`
      })
      .end((err, res) => {
        assert.exists(res.status);
        assert.exists(res.body.success);
        assert.exists(res.body.message);
        assert.equal(res.status, 401);
        assert.equal(res.body.success, false);
        assert.equal(res.body.message, 'Username already exists');
      });
    done();
  });

  it('should not be able to signup: already existing email', (done) => {
    request
      .post(signup)
      .send({
        username: `${username}test`,
        password,
        email
      })
      .end((err, res) => {
        assert.exists(res.status);
        assert.exists(res.body.success);
        assert.exists(res.body.message);
        assert.equal(res.status, 401);
        assert.equal(res.body.success, false);
        assert.equal(res.body.message, 'Email already exists');
      });
    done();
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
      });
    done();
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
      });
    done();
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
      });
    done();
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
      });
    done();
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
      });
    done();
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
      });
    done();
  });
});

describe('Google Signin Route', () => {
  it('should be able to signin on initial usage', (done) => {
    request
      .post(googleSignin)
      .send({
        username: `google${username}`,
        password: `google${password}`,
        email: `google${email}`
      })
      .end((err, res) => {
        assert.exists(res.status);
        assert.exists(res.body.success);
        assert.exists(res.body.message);
        assert.exists(res.body.token);
        assert.equal(res.status, 200);
        assert.equal(res.body.success, true);
        assert.equal(res.body.message, 'User authenticated successfully');
        assert.equal(res.body.username, username);
        assert.equal(res.body.email, email);
        userToken = res.body.token;
      });
    done();
  });

  it('should be able to signin after having signed up previously', (done) => {
    request
      .post(googleSignin)
      .send({
        username: `google${username}`,
        password: `google${password}`,
        email: `google${email}`
      })
      .end((err, res) => {
        assert.exists(res.status);
        assert.exists(res.body.success);
        assert.exists(res.body.message);
        assert.exists(res.body.token);
        assert.equal(res.status, 200);
        assert.equal(res.body.success, true);
        assert.equal(res.body.message, 'User authenticated successfully');
        assert.equal(res.body.username, username);
        assert.equal(res.body.email, email);
        userToken = res.body.token;
      });
    done();
  });

  it('should not be able to signin using google: missing username', (done) => {
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
      });
    done();
  });

  it('should not be able to signin using google: missing password', (done) => {
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
      });
    done();
  });

  it('should not be able to signin using google: missing email', (done) => {
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
      });
    done();
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
      });
    done();
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
      });
    done();
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
      });
    done();
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
      });
    done();
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
      });
    done();
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
      });
    done();
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
      });
    done();
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
      });
    done();
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
      });
    done();
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
      });
    done();
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
      });
    done();
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
      });
    done();
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
        assert.exists(res.body.image);
        assert.equal(res.status, 200);
        assert.equal(res.body.success, true);
        assert.equal(res.body.message, 'User successfully updated');
        assert.equal(res.body.image, 'imageUrl');
      });
    done();
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
      });
    done();
  });
});

describe('Edit Password Route', () => {
  it('should edit password', (done) => {
    request
      .put(`${editUser}/6/password`)
      .set('user-token', userToken)
      .send({
        password: 'password',
        newPassword: 'password1',
        confirmPassword: 'password1'
      })
      .end((err, res) => {
        assert.exists(res.status);
        assert.exists(res.body.success);
        assert.exists(res.body.message);
        assert.equal(res.status, 200);
        assert.equal(res.body.success, true);
        assert.equal(res.body.message, 'Password change successful');
      });
    done();
  });
  it('should edit password', (done) => {
    request
      .put(`${editUser}/6/password`)
      .set('user-token', userToken)
      .send({
        password: 'password1',
        newPassword: 'password',
        confirmPassword: 'password'
      })
      .end((err, res) => {
        assert.exists(res.status);
        assert.exists(res.body.success);
        assert.exists(res.body.message);
        assert.equal(res.status, 200);
        assert.equal(res.body.success, true);
        assert.equal(res.body.message, 'Password change successful');
      });
    done();
  });
  it('should not edit password: missing password', (done) => {
    request
      .put(`${editUser}/6/password`)
      .set('user-token', userToken)
      .send({
        newPassword: 'password',
        confirmPassword: 'password'
      })
      .end((err, res) => {
        assert.exists(res.status);
        assert.exists(res.body.success);
        assert.exists(res.body.message);
        assert.equal(res.status, 400);
        assert.equal(res.body.success, false);
        assert.equal(res.body.message, 'Password is required');
      });
    done();
  });
  it('should not edit password: missing new password', (done) => {
    request
      .put(`${editUser}/6/password`)
      .set('user-token', userToken)
      .send({
        password: 'password1',
        confirmPassword: 'password'
      })
      .end((err, res) => {
        assert.exists(res.status);
        assert.exists(res.body.success);
        assert.exists(res.body.message);
        assert.equal(res.status, 400);
        assert.equal(res.body.success, false);
        assert.equal(res.body.message, 'New password is required');
      });
    done();
  });
  it('should not edit password: missing confirm password', (done) => {
    request
      .put(`${editUser}/6/password`)
      .set('user-token', userToken)
      .send({
        password: 'password1',
        newPassword: 'password',
      })
      .end((err, res) => {
        assert.exists(res.status);
        assert.exists(res.body.success);
        assert.exists(res.body.message);
        assert.equal(res.status, 400);
        assert.equal(res.body.success, false);
        assert.equal(res.body.message, 'Confirm password is required');
      });
    done();
  });

  it('should  not edit password: password mismatch', (done) => {
    request
      .put(`${editUser}/6/password`)
      .set('user-token', userToken)
      .send({
        password: 'password1',
        newPassword: 'password',
        confirmPassword: 'passwordee'
      })
      .end((err, res) => {
        assert.exists(res.status);
        assert.exists(res.body.success);
        assert.exists(res.body.message);
        assert.equal(res.status, 400);
        assert.equal(res.body.success, false);
        assert.equal(res.body.message, 'New password does not match');
      });
    done();
  });
  it('should not edit password: incorrect password', (done) => {
    request
      .put(`${editUser}/6/password`)
      .set('user-token', userToken)
      .send({
        password: 'pa8877word1',
        newPassword: 'password',
        confirmPassword: 'password'
      })
      .end((err, res) => {
        assert.exists(res.status);
        assert.exists(res.body.success);
        assert.exists(res.body.message);
        assert.equal(res.status, 400);
        assert.equal(res.body.success, false);
        assert.equal(res.body.message, 'Password is incorrect');
      });
    done();
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
      });
    done();
  });
});
