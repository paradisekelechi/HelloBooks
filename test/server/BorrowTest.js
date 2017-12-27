import chai from 'chai';
import supertest from 'supertest';
import app from '../../app';
import routes from '../../tools/Routes';
import {
  bookId,
  userId
} from './TestData';

const clientToken = process.env.USERTOKEN;
const {
  users
} = routes;
const {
  assert
} = chai;
const request = supertest(app);

describe('Borrow book', () => {
  it('should be able to borrow a book', (done) => {
    request
      .post(`${users}/${userId}/books`)
      .set('user-token', clientToken)
      .send({
        bookId
      })
      .end((err, res) => {
        assert.exists(res.status);
        assert.exists(res.body.success);
        assert.exists(res.body.message);
        assert.equal(res.status, 200);
        assert.equal(res.body.success, true);
        assert.equal(res.body.message, 'Book borrowed successfully');
        done();
      });
  });
  it('should not be able to borrow a book', (done) => {
    request
      .post(`${users}/${userId}/books`)
      .set('user-token', clientToken)
      .end((err, res) => {
        assert.exists(res.status);
        assert.exists(res.body.success);
        assert.exists(res.body.message);
        assert.equal(res.status, 400);
        assert.equal(res.body.success, false);
        assert.equal(res.body.message, 'Oops! BookId is required!');
        done();
      });
  });
});

describe('Get borrowed books', () => {
  it('should be able to get borrowed books', (done) => {
    request
      .get(`${users}/${userId}/books`)
      .set('user-token', clientToken)
      .end((err, res) => {
        assert.exists(res.status);
        assert.exists(res.body.success);
        assert.exists(res.body.message);
        done();
      });
  });
});


describe('Return book', () => {
  it('should be able to return a book', (done) => {
    request
      .put(`${users}/${userId}/books`)
      .set('user-token', clientToken)
      .send({
        bookId
      })
      .end((err, res) => {
        assert.exists(res.status);
        assert.exists(res.body.success);
        assert.exists(res.body.message);
        assert.equal(res.status, 200);
        assert.equal(res.body.success, true);
        assert.equal(res.body.message, 'Book returned successfully');
        done();
      });
  });
  it('should not be able to return a book', (done) => {
    request
      .put(`${users}/${userId}/books`)
      .set('user-token', clientToken)
      .send({
        bookId
      })
      .end((err, res) => {
        assert.exists(res.status);
        assert.exists(res.body.success);
        assert.exists(res.body.message);
        assert.equal(res.status, 200);
        assert.equal(res.body.success, false);
        assert.equal(
          res.body.message,
          'Oops! You are trying to return a  book you did not borrow!'
        );
        done();
      });
  });
});
