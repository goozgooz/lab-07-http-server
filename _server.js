'use strict';

const http = require('http');
const url = require('url');
const cowsay = require('cowsay');
const querystring = require('querystring');
const bodyParser = require('./lib/body-parser.js');

const server = module.exports = http.createServer((req, res) => {
  req.url = url.parse(req.url);

  if(req.method === 'GET'  && req.url.pathname === '/') {
    sendCowResponse(res, 200, 'Welcome To Server');
  }
  else if(req.method === 'GET' && req.url.pathname === '/cowsay') {
    let message = querystring.parse(req.url.query).text;    
    sendCowResponse(res, 200, message);
  }
  else if(req.method ==='POST' && req.url.pathname === '/') {
    bodyParser(req)
      .then( req => {
        sendCowResponse(res, 200, JSON.stringify(req.body));
      })
      .catch( err => {
        sendResponse(res, 400, 'err' + err);
      });
  }
});

// server.listen(3000, () => {
//   console.log('server up on 3000');
// });


let sendCowResponse = (res, status, body) => {
  res.writeHead(status, {'Content-Type': 'text/plain'});
  res.write(cowsay.say({text: body}));
  res.end();
};


let sendResponse = function(res, status, body) {
  res.writeHead(status, {'Content-Type': 'text/plain'});
  res.write(body);
  res.end();
};