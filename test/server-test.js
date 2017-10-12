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

  it('should return a cow saying "Welcome To Server" to a get request', function(done){
    request
      .get(host + '/')
      .end((err,res) => {
        expect(err).toBe(null);
        expect(res.text).toBe(cowsay.say({text: 'Welcome To Server'}));
        done();
      });
  });
});