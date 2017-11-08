import chai from 'chai';
import supertest from 'supertest';
import app from '../../app';
import * as testConstants from './testdata';

const { assert } = chai;


describe('Unit test for Book routes ', () => {
  it('Add Book1', (done) => {
    supertest(app).post('/api/v1/books')
      .send({
        token: testConstants.admin_token,
        name: testConstants.bookName,
        author: testConstants.bookAuthor,
        description: testConstants.bookDescription,
        categoryId: testConstants.bookCategoryId,
        quantity: testConstants.bookQuantity
      })
      .end((err, res) => {
        assert.equal(res.statusCode, 200);
        assert.equal(res.body.success, true);
        done();
      });
  });

  it('Add Book', (done) => {
    supertest(app).post('/api/v1/books')
      .send({
        token: testConstants.adminToken,
        author: testConstants.bookAuthor,
        description: testConstants.bookDescription,
        categoryId: testConstants.bookCategoryId,
        quantity: testConstants.bookQuantity
      })
      .end((err, res) => {
        assert.equal(res.statusCode, 400);
        assert.equal(res.body.success, false);
        assert.equal(res.body.message, 'Book name is required');
        done();
      });
  });

  it('Add Book', (done) => {
    supertest(app).post('/api/v1/books')
      .send({
        token: testConstants.adminToken,
        name: testConstants.bookName,
        description: testConstants.bookDescription,
        categoryId: testConstants.bookCategoryId,
        quantity: testConstants.bookQuantity
      })
      .end((err, res) => {
        assert.equal(res.statusCode, 400);
        assert.equal(res.body.success, false);
        assert.equal(res.body.message, 'Book author is required');
        done();
      });
  });

  it('Add Book', (done) => {
    supertest(app).post('/api/v1/books')
      .send({
        token: testConstants.admin_token,
        name: testConstants.bookName,
        author: testConstants.bookAuthor,
        description: testConstants.bookDescription,
        categoryId: testConstants.bookCategoryId,
      })
      .end((err, res) => {
        assert.equal(res.statusCode, 400);
        assert.equal(res.body.success, false);
        assert.equal(res.body.message, 'Quantity is required');
        done();
      });
  });

  it('Add Book', (done) => {
    supertest(app).post('/api/v1/books')
      .set('user-token', testConstants.admin_token)
      .send({
        token: testConstants.admin_token,
        name: testConstants.bookName,
        author: testConstants.bookAuthor,
        description: testConstants.bookDescription,
        quantity: testConstants.bookQuantity
      })
      .end((err, res) => {
        assert.equal(res.statusCode, 400);
        assert.equal(res.body.success, false);
        assert.equal(res.body.message, 'Category is required');
        done();
      });
  });

  it('Edit Book', (done) => {
    supertest(app).put(`/api/v1/books/${testConstants.bookId}`)
      .set('user-token', testConstants.user_token)
      .send({
        token: testConstants.admin_token,
        name: testConstants.bookName,
        author: testConstants.bookAuthor,
        description: testConstants.bookDescription,
        categoryId: testConstants.bookCategoryId,
        quantity: testConstants.bookQuantity
      })
      .end((err, res) => {
        assert.equal(res.statusCode, 200);
        assert.equal(res.body.success, true);
        done();
      });
  });

  it('Get Books', (done) => {
    supertest(app).get('/api/v1/books/')
      .set('user-token', testConstants.user_token)
      .send()
      .end((err, res) => {
        assert.equal(res.statusCode, 200);
        assert.equal(res.body.success, true);
        done();
      });
  });

  it('Get Books by category', (done) => {
    supertest(app).get('/api/v1/books/category/2')
      .set('user-token', testConstants.user_token)
      .send()
      .end((err, res) => {
        assert.equal(res.statusCode, 200);
        assert.equal(res.body.success, true);
        done();
      });
  });
});
