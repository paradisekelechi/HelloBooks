"use strict";
import chai from 'chai';
import supertest from 'supertest';
import app from '../app.js';
import * as testConstants from './testdata';

const assert = chai.assert;



describe('Unit test for Usertype routes ', () => {
    it('Add User Type', (done)=>{
        supertest(app).post('/api/v1/usertype')
        .set('user-token', testConstants.admin_token)
        .send({
            name: testConstants.randomData,
            description: testConstants.randomData,
            level: 1
        })
        .end((err, res) => {
            assert.equal(res.statusCode, 400);
            done();
        });
    });

    
    it('Get User types', (done)=>{
        supertest(app).get('/api/v1/usertype/')
        .set('user-token', testConstants.user_token)
        .send()
        .end((err, res) => {
            assert.equal(res.statusCode, 200);
            assert.equal(res.body.success, true);
            done();
        });
    });
});
