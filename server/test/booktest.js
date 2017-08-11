"use strict";
import chai from 'chai';
import should from 'should';
import supertest from 'supertest';
import app from '../app.js';
import * as testConstants from './testdata';

let expect = chai.expect();
const assert = chai.assert;



describe('Unit test for Book routes ', () => {
    it('Add Book', (done)=>{
        supertest(app).post('/api/v1/books')
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

    it('Edit Book', (done)=>{
        supertest(app).put('/api/v1/books/'+testConstants.bookId)
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

    it('Get Book', (done)=>{
        supertest(app).get('/api/v1/books/')
        .set('user-token', testConstants.user_token)
        .send()
        .end((err, res) => {
            assert.equal(res.statusCode, 200);
            assert.equal(res.body.success, true);
            done();
        });
    });

});
