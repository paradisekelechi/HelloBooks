"use strict";
//Import modules
import chai from 'chai';
import should from 'should';
import supertest from 'supertest';
import app from '../app.js';
import * as testConstants from './testdata';

let expect = chai.expect();

//Define the API url
const api = supertest('http://localhost:4000');


describe('Unit test for borrow and return routes ', () => {
    /**
     * Borrow book route test if book is available and user have not borrowed that book before
     */
    it('BORROW BOOK: User should be able to borrow a book successfully if book is available and user has not borrowed and not returned that book', (done) => {
        api.post('/api/users/'+testConstants.userId+'/books/')
        .set('Accept', 'application/x-www-form-urlencoded')
        .send({
            bookId: testConstants.bookId,
        })
        .expect(200)
        .end((err, res) => {
            res.status.should.equal(200);
            res.body.should.have.property('success');
            res.body.success.should.equal(true);
            res.body.should.have.property('message');
            res.body.message.should.equal('Book borrowed successfully');
            done(err);
        });
    });

    /**
     * Borrow book route test if book is available and user has borrowed that book before
     */
    it('BORROW BOOK: User should not be able to borrow a book successfully if book is available but user has borrowed that book before', (done) => {
        api.post('/api/users/'+testConstants.userId+'/books/')
        .set('Accept', 'application/x-www-form-urlencoded')
        .send({
            bookId: testConstants.bookId,
        })
        .expect(400)
        .end((err, res) => {
            res.status.should.equal(400);
            res.body.should.have.property('success');
            res.body.success.should.equal(false);
            res.body.should.have.property('message');
            res.body.message.should.equal('');
            done(err);
        });
    });

    /**
     * Borrow book route test if bookId is empty
     */
    it('BORROW BOOK: User should not be able to borrow a book successfully if bookId null or empty', (done) => {
        api.post('/api/users/1/books/')
        .set('Accept', 'application/x-www-form-urlencoded')
        .send({
            bookId: '',
        })
        .expect(400)
        .end((err, res) => {
            res.status.should.equal(400);
            res.body.should.have.property('success');
            res.body.success.should.equal(false);
            res.body.should.have.property('message');
            res.body.message.should.equal('Oops! BookId is required!');
            done(err);
        });
    });

    /**
     * Borrow book route test if book is unavailable for borrow
     */
    it('BORROW BOOK: User should not be able to borrow a book successfully if book is no longer instock', (done) => {
        api.post('/api/users/1/books/')
        .set('Accept', 'application/x-www-form-urlencoded')
        .send({
            bookId: testConstants.bookIdFinished,
        })
        .expect(400)
        .end((err, res) => {
            res.status.should.equal(400);
            res.body.should.have.property('success');
            res.body.success.should.equal(false);
            res.body.should.have.property('message');
            res.body.message.should.equal('Oops! This book is no longer available for borrow');
            done(err);
        });
    });

    /**
     * Return book route test if book has not been returned by user
     */
    it('RETURN BOOK: User should be able to return a book successfully if book has not been returned by user', (done) => {
        api.put('/api/users/1/books/')
        .set('Accept', 'application/x-www-form-urlencoded')
        .send({
            bookId: testConstants.bookId,
        })
        .expect(200)
        .end((err, res) => {
            res.status.should.equal(200);
            res.body.should.have.property('success');
            res.body.success.should.equal(true);
            res.body.should.have.property('message');
            res.body.message.should.equal('Book returned successfully');
            done(err);
        });
    });

    /**
     * Return book route test if book was not borrowed by user
     */
    it('RETURN BOOK: User should not be able to return a book successfully if book was not borrowed by user', (done) => {
        api.put('/api/users/1/books/')
        .set('Accept', 'application/x-www-form-urlencoded')
        .send({
            bookId: testConstants.bookIdUnborrowed,
        })
        .expect(400)
        .end((err, res) => {
            res.status.should.equal(400);
            res.body.should.have.property('success');
            res.body.success.should.equal(false);
            res.body.should.have.property('message');
            res.body.message.should.equal('Oops! You are trying to return a  book you did not borrow!');
            done(err);
        });
    });

    /**
     * Return book route test if book was borrowed by user but has already been returned
     */
    it('RETURN BOOK: User should not be able to return a book successfully if book was borrowed by user but has already been returned', (done) => {
        api.put('/api/users/1/books/')
        .set('Accept', 'application/x-www-form-urlencoded')
        .send({
            bookId: testConstants.bookId,
        })
        .expect(400)
        .end((err, res) => {
            res.status.should.equal(400);
            res.body.should.have.property('success');
            res.body.success.should.equal(false);
            res.body.should.have.property('message');
            res.body.message.should.equal('Oops! You have already returned this book!');
            done(err);
        });
    });

    
    /**
     * Get pending borrowed-books by user
     */
    it('GET PENDING BOOKS: Users should be able get all books that he has borrowed but is pending return', (done) => {
        api.get('/api/users/'+testConstants.userId+'/books?returned=false')
        .expect(200)
        .end((err, res) => {
            res.status.should.equal(200);
            res.body.should.have.property('success');
            res.body.success.should.equal(true);
            res.body.should.have.property('message');
            res.body.should.have.property('booklog');
            res.body.booklog.should.be.instanceof(Array);
            done(err);
        });
    });
});
