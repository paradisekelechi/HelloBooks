import chai from 'chai';
import supertest from 'supertest';
import app from '../../app';
import routes from '../../tools/Routes';
import {
  bookId,
  userId,
  bookIdFinished,
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
      });
    done();
  });
  it('should not be able to borrow a book that this user has already borrowed', (done) => {
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
        assert.equal(res.status, 400);
        assert.equal(res.body.success, false);
        assert.equal(res.body.message, 'You have already borrowed this book');
      });
    done();
  });
  it('should not be able to borrow a book that does not exist', (done) => {
    request
      .post(`${users}/${userId}/books`)
      .set('user-token', clientToken)
      .send({
        bookId: 10000
      })
      .end((err, res) => {
        assert.exists(res.status);
        assert.exists(res.body.success);
        assert.exists(res.body.message);
        assert.equal(res.status, 404);
        assert.equal(res.body.success, false);
        assert.equal(res.body.message, 'Book does not exist');
      });
    done();
  });
  it('should not be able to borrow a book: missing bookId', (done) => {
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
      });
    done();
  });
  it('should not be able to borrow a book that has already been borrowed by the user', (done) => {
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
        assert.equal(res.status, 400);
        assert.equal(res.body.success, false);
        assert.equal(res.body.message, 'You have already borrowed this book');
      });
    done();
  });
  it('should not be able to borrow a book that has finished', (done) => {
    request
      .post(`${users}/${userId}/books`)
      .set('user-token', clientToken)
      .send({
        bookId: bookIdFinished
      })
      .end((err, res) => {
        assert.exists(res.status);
        assert.exists(res.body.success);
        assert.exists(res.body.message);
        assert.equal(res.status, 404);
        assert.equal(res.body.success, false);
        assert.equal(res.body.message, 'Book is no longer available');
      });
    done();
  });
  it('should not be able to borrow a book with missing bookId', (done) => {
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
      });
    done();
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
      });
    done();
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
      });
    done();
  });
  it('should not be able to return a book that has already been returned', (done) => {
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
        assert.equal(res.status, 400);
        assert.equal(res.body.success, false);
        assert.equal(res.body.message, 'Oops! You have already returned this book!');
      });
    done();
  });
  it('should  not be able to return a book: missing bookId', (done) => {
    request
      .put(`${users}/${userId}/books`)
      .set('user-token', clientToken)
      .end((err, res) => {
        assert.exists(res.status);
        assert.exists(res.body.success);
        assert.exists(res.body.message);
        assert.equal(res.status, 400);
        assert.equal(res.body.success, false);
        assert.equal(res.body.message, 'BookId is required!');
      });
    done();
  });
  it('should not be able to return a book that does not exist', (done) => {
    request
      .put(`${users}/${userId}/books`)
      .set('user-token', clientToken)
      .send({
        bookId: 1000
      })
      .end((err, res) => {
        assert.exists(res.status);
        assert.exists(res.body.success);
        assert.exists(res.body.message);
        assert.equal(res.status, 404);
        assert.equal(res.body.success, false);
        assert.equal(res.body.message, 'Book does not exist');
      });
    done();
  });
});
