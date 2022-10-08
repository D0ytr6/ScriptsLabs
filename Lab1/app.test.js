// const app = require('./server');
// const supertest = require('supertest');
// const request = supertest(app);

// it('gets the test endpoint', async (done) => {

//     const response = await request.get('/test');
//     done();
//     // expect(response.status).toBe(200);
//     // expect(response.body.message).toBe('pass!').done();
    
// }); 

// const request = require('supertest');
// var app = require('./server');
// const assert = require('assert');

// it('should return Hello Test', function (done) {
//   request(app)
//     .get('/test')
//     .expect(200)
//     .expect(function (response) {
//       assert.deepEqual(response.body, {
//         message: 'pass!',
//       });
//     })
//     .end(done)
  
// });

const request = require('supertest');
var app = require('./app');
const assert = require('assert');

it('should return Hello Test', function (done) {
  request(app).get('/').expect('Hello World!').end(done);
});