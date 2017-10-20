import chai from 'chai';
import supertest from 'supertest';
import app from '../../server/app';
import * as testConstants from './testdata';

const assert = chai.assert;



describe('Unit test for Book routes ', () => {
    it('Add Account Type', (done)=>{
        supertest(app).post('/api/v1/accounttype')
        .set('user-token', testConstants.admin_token)
        .send({
            name: testConstants.randomData,
            description: testConstants.randomData,
            level: 4
        })
        .end((err, res) => {
            assert.equal(res.statusCode, 400);
            done();
        });
    });

    it('Add Account Type', (done)=>{
        supertest(app).post('/api/v1/accounttype')
        .set('user-token', testConstants.admin_token)
        .send({
            description: testConstants.randomData,
            level: 4
        })
        .end((err, res) => {
            assert.equal(res.statusCode, 400);
            done();
        });
    });

    it('Add Account Type', (done)=>{
        supertest(app).post('/api/v1/accounttype')
        .set('user-token', testConstants.admin_token)
        .send({
            name: testConstants.randomData,
            level: 4
        })
        .end((err, res) => {
            assert.equal(res.statusCode, 400);
            done();
        });
    });
    
    it('Get Account types', (done)=>{
        supertest(app).get('/api/v1/accounttype/')
        .set('user-token', testConstants.user_token)
        .send()
        .end((err, res) => {
            assert.equal(res.statusCode, 200);
            assert.equal(res.body.success, true);
            done();
        });
    });
});
