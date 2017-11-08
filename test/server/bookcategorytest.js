import chai from 'chai';
import supertest from 'supertest';
import app from '../../app';
import * as testConstants from './testdata';

const { assert } = chai;

describe('Unit test for Book Category routes ', () => {
  it('Add Category Type', (done) => {
    supertest(app).post('/api/v1/category')
      .set('user-token', testConstants.admin_token)
      .send({
        name: testConstants.randomData,
        description: testConstants.randomData,
        abbreviation: 'RND'
      })
      .end((err, res) => {
        assert.equal(res.statusCode, 400);
        done();
      });
  });


  it('Get Book categories', (done) => {
    supertest(app).get('/api/v1/category/')
      .set('user-token', testConstants.user_token)
      .send()
      .end((err, res) => {
        assert.equal(res.statusCode, 200);
        assert.equal(res.body.success, true);
        done();
      });
  });
});
