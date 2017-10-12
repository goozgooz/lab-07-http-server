'use strict';

const expect = require('expect');
const cowsay = require('cowsay');
const request = require('superagent');

const server = require('../_server');

const PORT = 6969;
const host = 'localhost:' + PORT;


describe('my http server', function() {
  before(function(done) {
    server.listen(PORT, done);
  });

  after(function(done){
    server.close(done);
  });

  it('should return a cow saying "Welcome To Server" to a GET request at /', function(done){
    request
      .get(host + '/')
      .end((err,res) => {
        expect(err).toBe(null);
        expect(res.text).toBe(cowsay.say({text: 'Welcome To Server'}));
        done();
      });
  });
  
  it('should return a cow saying the query parameter given to a GET request', function(done){
    request
      .get(host + '/cowsay?text=moo')
      .end((err,res) => {
        expect(err).toBe(null);
        expect(res.text).toBe(cowsay.say({text: 'moo'}));
        done();
      });
  });
  
  it('should return a cow saying the JSON sent in a POST request', function(done){
    request
      .post(host + '/')
      .send({test: 'cool beans'})
      .end((err,res) => {
        expect(err).toBe(null);
        expect(res.text).toBe(cowsay.say({text: '{"test":"cool beans"}'}));
        done();
      });
  });
  
  it('should return an error if bad JSON', function(done){
    request
      .post(host + '/')
      .send('asdfa')
      .end((err,res) => {
        expect(err).not.toBe(null);
        done();
      });
  });

});