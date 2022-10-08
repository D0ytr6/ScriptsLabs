
const request = require('supertest');
var app = require('./app');
const assert = require('assert');

it('should return Hello Test', function (done) {
  request(app).get('/').expect('Hello World!').end(done);
});