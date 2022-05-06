'use strict';

const supertest = require('supertest');
const { app } = require('../server.js');
const request = supertest(app);

const user1Credentials = {
  username: 'user1',
  password: 'password',
};

const user2Credentials = {
  username: 'user2',
  password: 'password',
};

const adminCredentials = {
  username: 'admin',
  password: 'password',
  role: 'admin',
};

let testUser1;
let testUser2;
let testAdmin;

describe('Testing todo access', () => {

  test('User should not be able to update another user\'s todo item', async () => {
    // Sign up our users
    testUser1 = await request.post('/signup').send(user1Credentials);
    testUser1 = testUser1.body;

    testUser2 = await request.post('/signup').send(user2Credentials);
    testUser2 = testUser2.body;

    let response = await request
      .post('/todo')
      .set('Authorization', `Bearer ${testUser1.token}`)
      .send({ body: 'I love having secure todo items' });

    let id = response.body.id;

    response = await request
      .put(`/todo/${id}`)
      .set('Authorization', `Bearer ${testUser2.token}`)
      .send({ body: 'I hate having secure todo items' });

    expect(response.status).toBe(403);
  });

  test('User should not be able to delete another user\'s todo item', async () => {
    let response = await request
      .post('/todo')
      .set('Authorization', `Bearer ${testUser1.token}`)
      .send({ body: 'I own my own todo items' });

    let id = response.body.id;

    response = await request
      .delete(`/todo/${id}`)
      .set('Authorization', `Bearer ${testUser2.token}`);

    expect(response.status).toBe(403);
  });

  test('Admin should be able to update another user\'s todo item', async () => {
    // signup the admin
    testAdmin = await request.post('/signup').send(adminCredentials);
    testAdmin = testAdmin.body;

    // post a todo
    let response = await request
      .post('/todo')
      .set('Authorization', `Bearer ${testUser1.token}`)
      .send({ body: 'I hope the admin doesn\'t change this' });

    let id = response.body.id;

    // try to update it
    response = await request
      .put(`/todo/${id}`)
      .set('Authorization', `Bearer ${testAdmin.token}`)
      .send({ body: 'Nope, I can change it' });

    expect(response.status).toBe(200);
    expect(response.body.body).toBe('Nope, I can change it');
  });

  test('Admin should be able to delete another user\'s todo item', async () => {
    let response = await request
      .post('/todo')
      .set('Authorization', `Bearer ${testUser1.token}`)
      .send({ body: 'I hope my todo doesn\'t get deleted' });

    let id = response.body.id;

    response = await request
      .delete(`/todo/${id}`)
      .set('Authorization', `Bearer ${testAdmin.token}`);

    expect(response.status).toBe(204);

    response = await request
      .get(`/todo/${id}`)
      .set('Authorization', `Bearer ${testUser1.token}`);

    expect(response.status).toBe(500);
  });
});
