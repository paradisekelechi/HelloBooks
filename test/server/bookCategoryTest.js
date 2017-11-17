import chai from 'chai';
import supertest from 'supertest';
import app from '../../app';
import routes from '../../tools/apiRoutes';
import {
  categoryName,
  categoryDescription,
  abbreviation
} from './testdata';

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
        done();
      });
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
        done();
      });
  });
});
