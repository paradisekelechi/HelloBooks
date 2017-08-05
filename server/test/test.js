"use strict";

const chai = require('chai');
const app = require('../app.js');
const should = require('should');
let expect = chai.expect();
const supertest = require('supertest');
const api = supertest('http://localhost:4000');


describe('/Get *', ()=>{
    it('Should return something', (done) => {
        api.get('/')
        .set('Accept', 'application/json')
        .expect(200)
        .end((err, res) => {
            res.status.should.equal(200);
            //res.body.should.exist('message');
            done(err);
        });
    });
});