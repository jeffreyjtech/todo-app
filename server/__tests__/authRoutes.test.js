'use strict';

const { app } = require('../server.js');
const supertest = require('supertest');
const request = supertest(app);
const base64 = require('base-64');

describe('Auth Route Testing', () => {
  let testUsername = 'coolguy';
  let testPassword = 'password';
  
  test('Should allow user to signup', async () => {
    let response = await request.post('/signup').send({
      username: testUsername,
      password: testPassword,
    });

    expect(response.status).toBe(200);
    expect(response.body.username).toBe(testUsername);
    expect(response.body.password).toBeTruthy();
  });

  test('Should allow a valid user to signin', async () => {
    let authString = `${testUsername}:${testPassword}`;
    let encodedString = base64.encode(authString);
    let response = await request.post('/signin').set('Authorization', `Basic ${encodedString}`);

    expect(response.status).toBe(200);
    expect(response.body.token).toBeTruthy();
  });

  test('Should not allow a user with invalid credentials to signin', async () => {
    let response = await request.post('/signin').set('Authorization', 'Basic BadAuthString');

    expect(response.status).toBe(403);
  });


  test('Should deny signup if username is empty', async () => {
    let response = await request.post('/signup').send({
      username: '',
      password: testPassword,
    });

    expect(response.status).toBe(500);
  
  });

  test('Should deny signup if password is empty', async () => {
    let response = await request.post('/signup').send({
      username: testUsername,
      password: '',
    });

    expect(response.status).toBe(500);
    
  });
});
