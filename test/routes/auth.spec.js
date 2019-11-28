import { expect } from 'chai';
import request from 'supertest';
import app from '../../src';

import { generateToken } from '../../src/helpers/auth';
import { admin, newUser, staff } from '../mocks/users.mock';

describe('routes: /auth', () => {
  let adminToken;
  let staffToken;
  before((done) => {
    request(app)
      .post('/auth/signin')
      .send({ email: admin.email, password: admin.password })
      .end((err, res) => {
        adminToken = res.body.data.token;
        done(err);
      });
  });

  context('POST /auth/signup', () => {
    it('should create a new user account', (done) => {
      request(app)
        .post('/auth/create-user')
        .send(newUser)
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .set('Authorization', `${adminToken}`)
        .end((err, res) => {
          const { status, body: { data } } = res;
          expect(status).to.equal(201);
          expect(data).to.be.an('object');
          expect(data).to.have.property('newUser');
          expect(data.newUser).to.have.property('id');
          expect(data.newUser).to.have.property('firstname');
          expect(data.newUser).to.have.property('lastname');
          expect(data.newUser).to.have.property('email');
          expect(data.newUser).to.have.property('gender');
          expect(data.newUser).to.have.property('jobRole');
          expect(data.newUser).to.have.property('department');
          expect(data.newUser).to.have.property('address');
          expect(data.newUser).not.to.have.property('password');
          expect(data).to.have.property('token');
          done(err);
        });
    });

    specify('error if user already exists', (done) => {
      request(app)
        .post('/auth/create-user')
        .send(newUser)
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .set('Authorization', `${adminToken}`)
        .end((err, res) => {
          expect(res.status).to.equal(409);
          expect(res.body.status).to.eql('error');
          expect(res.body.error).to.eql('email already taken');
          done(err);
        });
    });

    specify('error if token is not provided', (done) => {
      request(app)
        .post('/auth/create-user')
        .send(newUser)
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .end((err, res) => {
          expect(res.status).to.equal(412);
          expect(res.body.status).to.eql('error');
          done(err);
        });
    });

    specify('error if token provided is invalid', (done) => {
      staffToken = generateToken(staff);
      request(app)
        .post('/auth/create-user')
        .send(newUser)
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .set('Authorization', `${staffToken}`)
        .end((err, res) => {
          expect(res.status).to.equal(403);
          expect(res.body.status).to.eql('error');
          expect(res.body.error).to.eql('invalid credentials');
          done(err);
        });
    });
  });

  context('POST /auth/signin', () => {
    it('should sign in a user', (done) => {
      request(app)
        .post('/auth/signin')
        .send({ email: newUser.email, password: newUser.password })
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .end((err, res) => {
          const { status, body: { data } } = res;
          expect(status).to.equal(200);
          expect(data).to.be.an('object');
          expect(data).to.have.property('token');
          expect(data).to.have.property('user');
          expect(data.user).to.have.property('id');
          expect(data.user).to.have.property('firstname');
          expect(data.user).to.have.property('lastname');
          expect(data.user).to.have.property('email');
          expect(data.user).to.have.property('gender');
          expect(data.user).to.have.property('jobRole');
          expect(data.user).to.have.property('department');
          expect(data.user).to.have.property('address');
          expect(data.user).not.to.have.property('password');
          done(err);
        });
    });

    specify('error on invalid credentials', (done) => {
      request(app)
        .post('/auth/signin')
        .send({ email: newUser.email, password: 'theweeknd' })
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .end((err, res) => {
          expect(res.status).to.equal(401);
          expect(res.body.status).to.eql('error');
          expect(res.body.error).to.eql('email/password incorrect');
          done(err);
        });
    });
  });
});

// console.log('::::=>', res.body);
