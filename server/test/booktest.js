"use strict";
import chai from 'chai';
import should from 'should';
import supertest from 'supertest';
import app from '../app.js';

let expect = chai.expect();

//Define the API url
const api = supertest('http://localhost:4000');


describe('Unit test for Book routes ', () => {
    /**
     * Add book route test
     */
    it('ADD BOOK: Admin User should be able add a book successfully', (done) => {
        api.post('/api/books')
        .set('Accept', 'application/x-www-form-urlencoded')
        .send({
            name: 'Our Way to life',
            author: 'Luke Harry',
            description: 'A classical book on happiness',
            categoryId: '',
            quantity: 5
        })
        .expect(200)
        .end((err, res) => {
            res.status.should.equal(200);
            res.body.success.should.equal(true);
            res.body.should.have.property('message');
            res.body.message.should.equal('Book successfully added');
            res.body.should.have.property('success');
            done(err);
        });
    });

    /**
     * Add book route test
     */
    it('ADD BOOK: Admin User should not be able add a book successfully without book name', (done) => {
        api.post('/api/books')
        .set('Accept', 'application/x-www-form-urlencoded')
        .send({
            name: '',
            author: 'Luke Harry',
            description: 'A classical book on happiness',
            categoryId: '',
            quantity: 5
        })
        .expect(400)
        .end((err, res) => {
            res.status.should.equal(400);
            res.body.success.should.equal(false);
            res.body.should.have.property('message');
            res.body.message.should.equal('Oops, book name cannot be null');
            res.body.should.have.property('success');
            done(err);
        });
    });

    /**
     * Add book route test
     */
    it('ADD BOOK: Admin User should not be able add a book successfully without book author', (done) => {
        api.post('/api/books')
        .set('Accept', 'application/x-www-form-urlencoded')
        .send({
            name: 'Life as being sweet',
            author: '',
            description: 'A classical book on happiness',
            categoryId: '',
            quantity: 5
        })
        .expect(400)
        .end((err, res) => {
            res.status.should.equal(400);
            res.body.success.should.equal(false);
            res.body.should.have.property('message');
            res.body.message.should.equal('Oops, author cannot be null');
            res.body.should.have.property('success');
            done(err);
        });
    });




    /**
     * Edit book route test
     */
    it('EDIT BOOK: Admin User should be able edit a book successfully', (done) => {
        api.put('/api/books/2')
        .set('Accept', 'application/x-www-form-urlencoded')
        .send({
            description: 'A classical book on happiness',
            categoryId: '1',
            quantity: 5,
            image: 'classical.jpg'
        })
        .expect(200)
        .end((err, res) => {
            res.status.should.equal(200);
            res.body.success.should.equal(true);
            res.body.should.have.property('message');
            res.body.message.should.equal('Book edited successfully');
            res.body.should.have.property('success');
            done(err);
        });
    });

    /**
     * Edit book route test
     */
    it('EDIT BOOK: Admin User should not be able edit a book successfully with bookId as 0', (done) => {
        api.put('/api/books/0')
        .set('Accept', 'application/x-www-form-urlencoded')
        .send({
            description: 'A classical book on happiness',
            categoryId: '1',
            quantity: 5,
            image: 'classical.jpg'
        })
        .expect(400)
        .end((err, res) => {
            res.status.should.equal(400);
            res.body.success.should.equal(false);
            res.body.should.have.property('message');
            res.body.message.should.equal('Oops!! BookId cannot be 0');
            res.body.should.have.property('success');
            done(err);
        });
    });

    /**
     * Get books route test
     */
    it('GET BOOKS: Users should be able get all books successfully', (done) => {
        api.get('/api/books')
        .expect(200)
        .end((err, res) => {
            res.status.should.equal(200);
            res.body.should.have.property('success');
            res.body.success.should.equal(true);
            res.body.should.have.property('message');
            res.body.message.should.equal('Books obtained successfully');
            res.body.should.have.property('book');
            res.body.book.should.be.instanceof(Array);
            done(err);
        });
    });
});
