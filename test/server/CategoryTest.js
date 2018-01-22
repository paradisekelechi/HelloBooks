/**
 *  @fileOverview Test file for book category routes
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
import routes from '../../tools/Routes';
import {
  categoryName,
  categoryDescription,
  abbreviation
} from './TestData';

const adminToken = process.env.ADMINTOKEN;
const {
  bookCategory,
} = routes;
const {
  assert
} = chai;
const request = supertest(app);

describe('Add Book category', () => {
  it('should be able to add a book category', (done) => {
    request
      .post(`${bookCategory}`)
      .set('user-token', adminToken)
      .send({
        name: categoryName,
        abbreviation,
        description: categoryDescription
      })
      .end((err, res) => {
        assert.exists(res.status);
        assert.exists(res.body.success);
        assert.exists(res.body.message);
        assert.equal(res.status, 200);
        assert.equal(res.body.success, true);
        assert.equal(res.body.message, 'Book category added');
        assert.equal(res.body.category.name, categoryName);
        assert.equal(res.body.category.abbreviation, abbreviation);
        assert.equal(res.body.category.description, categoryDescription);
      });
    done();
  });
  it('should not be able to add a book category: already existing name', (done) => {
    request
      .post(`${bookCategory}`)
      .set('user-token', adminToken)
      .send({
        name: categoryName,
        abbreviation,
        description: categoryDescription
      })
      .end((err, res) => {
        assert.exists(res.status);
        assert.exists(res.body.success);
        assert.exists(res.body.message);
        assert.equal(res.status, 401);
        assert.equal(res.body.success, false);
        assert.equal(res.body.message, 'Category name already exists');
      });
    done();
  });
  it('should not be able to add a book category: already existing abbreviation', (done) => {
    request
      .post(`${bookCategory}`)
      .set('user-token', adminToken)
      .send({
        name: `${categoryName}gh`,
        abbreviation,
        description: categoryDescription
      })
      .end((err, res) => {
        assert.exists(res.status);
        assert.exists(res.body.success);
        assert.exists(res.body.message);
        assert.equal(res.status, 401);
        assert.equal(res.body.success, false);
        assert.equal(res.body.message, 'Category abbreviation already exists');
      });
    done();
  });

  it('should not be able to add a book category: missing name', (done) => {
    request
      .post(`${bookCategory}`)
      .set('user-token', adminToken)
      .send({
        abbreviation,
        description: categoryDescription
      })
      .end((err, res) => {
        assert.exists(res.status);
        assert.exists(res.body.success);
        assert.exists(res.body.message);
        assert.equal(res.status, 400);
        assert.equal(res.body.success, false);
        assert.equal(res.body.message, 'Oops! Name cannot be empty');
      });
    done();
  });

  it('should not be able to add a book category: missing abbreviation', (done) => {
    request
      .post(`${bookCategory}`)
      .set('user-token', adminToken)
      .send({
        name: categoryName,
        description: categoryDescription
      })
      .end((err, res) => {
        assert.exists(res.status);
        assert.exists(res.body.success);
        assert.exists(res.body.message);
        assert.equal(res.status, 400);
        assert.equal(res.body.success, false);
        assert.equal(res.body.message, 'Oops! Abbreviation cannot be empty');
      });
    done();
  });

  it('should not be able to add a book category: missing description', (done) => {
    request
      .post(`${bookCategory}`)
      .set('user-token', adminToken)
      .send({
        name: categoryName,
        abbreviation,
      })
      .end((err, res) => {
        assert.exists(res.status);
        assert.exists(res.body.success);
        assert.exists(res.body.message);
        assert.equal(res.status, 400);
        assert.equal(res.body.success, false);
        assert.equal(res.body.message, 'Oops! Description cannot be empty');
      });
    done();
  });
});

describe('Get Book categories', () => {
  it('should be able to get book categories', (done) => {
    request
      .get(`${bookCategory}`)
      .set('user-token', adminToken)
      .end((err, res) => {
        assert.exists(res.status);
        assert.exists(res.body.success);
        assert.exists(res.body.message);
        assert.exists(res.body.bookcategory);
        assert.equal(res.status, 200);
        assert.equal(res.body.success, true);
        assert.equal(res.body.message, 'Book category successfully gotten');
      });
    done();
  });
});
