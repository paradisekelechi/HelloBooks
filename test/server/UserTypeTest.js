import chai from 'chai';
import supertest from 'supertest';
import app from '../../app';
import routes from '../../tools/Routes';
import {
  userTypeName,
  userTypeDescription,
  userTypeLevel
} from './TestData';

const adminToken = process.env.ADMINTOKEN;
const {
  userType
} = routes;
const {
  assert
} = chai;
const request = supertest(app);

describe('Add Usertype', () => {
  it('should be able to add a user type', (done) => {
    request
      .post(`${userType}`)
      .set('user-token', adminToken)
      .send({
        name: userTypeName,
        description: userTypeDescription,
        level: userTypeLevel
      })
      .end((err, res) => {
        assert.exists(res.status);
        assert.exists(res.body.success);
        assert.exists(res.body.message);
        assert.equal(res.status, 200);
        assert.equal(res.body.success, true);
        assert.equal(res.body.message, 'Usertype added successfully');
        assert.equal(res.body.usertype.name, userTypeName);
        assert.equal(res.body.usertype.description, userTypeDescription);
        assert.equal(res.body.usertype.level, userTypeLevel);
        done();
      });
  });
  it('should not be able to add a user type', (done) => {
    request
      .post(`${userType}`)
      .set('user-token', adminToken)
      .send({
        description: userTypeDescription,
        level: userTypeLevel
      })
      .end((err, res) => {
        assert.exists(res.status);
        assert.exists(res.body.success);
        assert.exists(res.body.message);
        assert.equal(res.status, 400);
        assert.equal(res.body.success, false);
        assert.equal(res.body.message, 'Oops! Name cannot be empty');
        done();
      });
  });
  it('should not be able to add a user type', (done) => {
    request
      .post(`${userType}`)
      .set('user-token', adminToken)
      .send({
        name: userTypeName,
        level: userTypeLevel
      })
      .end((err, res) => {
        assert.exists(res.status);
        assert.exists(res.body.success);
        assert.exists(res.body.message);
        assert.equal(res.status, 400);
        assert.equal(res.body.success, false);
        assert.equal(res.body.message, 'Oops! Description cannot be empty');
        done();
      });
  });
  it('should not be able to add a user type', (done) => {
    request
      .post(`${userType}`)
      .set('user-token', adminToken)
      .send({
        name: userTypeName,
        description: userTypeDescription
      })
      .end((err, res) => {
        assert.exists(res.status);
        assert.exists(res.body.success);
        assert.exists(res.body.message);
        assert.equal(res.status, 400);
        assert.equal(res.body.success, false);
        assert.equal(res.body.message, 'Oops! Level cannot be empty');
        done();
      });
  });
  it('should not be able to add a user type: level as not a number', (done) => {
    request
      .post(`${userType}`)
      .set('user-token', adminToken)
      .send({
        name: userTypeName,
        description: userTypeDescription,
        level: 'text'
      })
      .end((err, res) => {
        assert.exists(res.status);
        assert.exists(res.body.success);
        assert.exists(res.body.message);
        assert.equal(res.status, 400);
        assert.equal(res.body.success, false);
        assert.equal(res.body.message, 'Level should be a valid number');
        done();
      });
  });
});

describe('Get Usertypes', () => {
  it('should be able to get account usertypes', (done) => {
    request
      .get(`${userType}`)
      .set('user-token', adminToken)
      .end((err, res) => {
        assert.exists(res.status);
        assert.exists(res.body.success);
        assert.exists(res.body.message);
        assert.exists(res.body.usertype);
        assert.equal(res.status, 200);
        assert.equal(res.body.success, true);
        assert.equal(res.body.message, 'Usertypes gotten successfully');
        done();
      });
  });
});
