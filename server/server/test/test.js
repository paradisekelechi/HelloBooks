"use strict";
import chai from 'chai';
import app from '../app.js';
import should from 'should';
let expect = chai.expect();
import supertest from 'supertest';
const api = supertest('http://localhost:4000');

//test base route
describe('Test api routes *', ()=>{
    it('Should return something', (done) => {
        api.get('/')
        .set('Accept', 'application/json')
        .expect(200)
        .end((err, res) => {
            res.status.should.equal(200);
            res.body.should.exist('message');
            done(err);
        });
    });
});
