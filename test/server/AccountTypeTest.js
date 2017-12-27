import chai from 'chai';
import supertest from 'supertest';
import app from '../../app';
import routes from '../../tools/Routes';
import {
  accountTypeName,
  accountTypeDescription,
  accountTypeLevel
} from './TestData';

const adminToken = process.env.ADMINTOKEN;
const {
  accountType
} = routes;
const {
  assert
} = chai;
const request = supertest(app);

describe('Add Account type', () => {
  it('should be able to add account type', (done) => {
    request
      .post(`${accountType}`)
      .set('user-token', adminToken)
      .send({
        name: accountTypeName,
        description: accountTypeDescription,
        level: accountTypeLevel
      })
      .end((err, res) => {
        assert.exists(res.status);
        assert.exists(res.body.success);
        assert.exists(res.body.message);
        assert.equal(res.status, 200);
        assert.equal(res.body.success, true);
        assert.equal(res.body.message, 'Accounttype added successfully');
        done();
      });
  });
  it('should not be able to add account type: missing name', (done) => {
    request
      .post(`${accountType}`)
      .set('user-token', adminToken)
      .send({
        description: accountTypeDescription,
        level: accountTypeLevel
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
  it('should not be able to add a account type: missing description', (done) => {
    request
      .post(`${accountType}`)
      .set('user-token', adminToken)
      .send({
        name: accountTypeName,
        level: accountTypeLevel
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
  it('should not be able to add a account type: missing level', (done) => {
    request
      .post(`${accountType}`)
      .set('user-token', adminToken)
      .send({
        name: accountTypeName,
        description: accountTypeDescription
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
  it('should not be able to add a account type: level as not a number', (done) => {
    request
      .post(`${accountType}`)
      .set('user-token', adminToken)
      .send({
        name: accountTypeName,
        description: accountTypeDescription,
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

describe('Get Account types', () => {
  it('should be able to get account account types', (done) => {
    request
      .get(`${accountType}`)
      .set('user-token', adminToken)
      .end((err, res) => {
        assert.exists(res.status);
        assert.exists(res.body.success);
        assert.exists(res.body.message);
        assert.exists(res.body.accounttype);
        assert.equal(res.status, 200);
        assert.equal(res.body.success, true);
        assert.equal(res.body.message, 'Account types gotten');
        done();
      });
  });
});
