var app = require('./../app.js');
var db = require('monk')('localhost/items');
var items = db.get('items');
var assert = require('assert');
var request = require('supertest');

before(function(done) {
  items.remove({}, function() {
    items.insert({title: 'Master Sword', _id: '55c050595ae876b6b79ad318'}, function() {
      done();
    });
  });
});


describe('POST api/items', function () {
  it('creates a new resource', function (done) {
    request(app)
      .post('/api/items')
      .send({title: 'from test'})
      .expect(201)
      .end(function(err, res) {
        if (err) {
          throw err;
        } else {
          assert.equal(res.body.title,'from test');
          done();
        }
      })
  });
});


describe('PUT api/items/:id', function () {
  it('updates a resource', function (done) {
    request(app)
      .put('/api/items/55c050595ae876b6b79ad318')
      .send({title:'from test'})
      .expect(200)
      .end(function(err, res) {
        if (err) {
          throw err;
        } else {
          assert.equal(res.body.title,'from test');
          done();
        }
      });
  });
});


describe('GET /api/items/:id', function(){
  it('respond with json', function(done){
    request(app)
      .get('/api/items/55c050595ae876b6b79ad318')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function(err, res) {
        if (err) {
          throw err;
        } else {
          assert.equal(res.body.title,'from test');
          done();
        }
      })
  });
});

describe('DELETE /api/items/:id', function(){
  it('deletes a resource', function(done){
    request(app)
      .del('/api/items/55c050595ae876b6b79ad318')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function(err, res) {
        if (err) {
          throw err;
        } else {
          assert.equal(res.status, 200);
          done();
        }
      })
  });
});

describe('GET /api/items', function(){
  it('respond with json', function(done){
    request(app)
      .get('/api/items')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function(err, res) {
        if (err) {
          throw err;
        } else {
          assert.equal(res.status, 200);
          done();
        }
      })
  });
});


























