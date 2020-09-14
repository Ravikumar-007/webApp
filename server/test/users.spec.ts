import * as chai from 'chai';
import chaiHttp = require('chai-http');
import { describe, it } from 'mocha';

process.env.NODE_ENV = 'test';
import { app } from '../app';
import User from '../models/user';

chai.use(chaiHttp).should();

describe('Users', () => {

  beforeEach(done => {
    User.remove({}, err => {
      done();
    });
  });

  describe('Backend tests for users', () => {

    it('should get a user by its id', done => {
      const user = new User({ username: 'User', email: 'user@example.com', role: 'user' });
      user.save((error, newUser) => {
        chai.request(app)
          .get(`/api/user/${newUser.id}`)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('username');
            res.body.should.have.property('email');
            res.body.should.have.property('role');
            res.body.should.have.property('_id').eql(newUser.id);
            done();
          });
      });
    });

    it('should update a user by its id', done => {
      const user = new User({ username: 'User', email: 'user@example.com', role: 'user' });
      user.save((error, newUser) => {
        chai.request(app)
          .put(`/api/user/${newUser.id}`)
          .send({ username: 'User 2' })
          .end((err, res) => {
            res.should.have.status(200);
            done();
          });
      });
    });
  });

});


