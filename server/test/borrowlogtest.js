"use strict";
import chai from 'chai';
import supertest from 'supertest';
import app from '../app.js';
import * as testConstants from './testdata';

const assert = chai.assert;
const testUserId =1;
const testBookId = 1;


describe('Unit test for Borrow log routes ', () => {
    it('Borrow Book', (done)=>{
        supertest(app).post('/api/v1/users/'+testUserId+'/books')
        .set('user-token', testConstants.admin_token)
        .send({
            bookId: testBookId
        })
        .end((err, res) => {
            assert.equal(res.statusCode, 200);
            done();
        });
    });

    it('Get Borrowed books', (done)=>{
        supertest(app).get('/api/v1/users/'+testUserId+'/books')
        .set('user-token', testConstants.user_token)
        .send()
        .end((err, res) => {
            assert.equal(res.statusCode, 200);
            assert.equal(res.body.success, true);
            done();
        });
    });

    it('Return Book', (done)=>{
        supertest(app).put('/api/v1/users/'+testUserId+'/books')
        .set('user-token', testConstants.admin_token)
        .send({
            bookId: testBookId
        })
        .end((err, res) => {
            assert.equal(res.statusCode, 200);
            done();
        });
    });
});
