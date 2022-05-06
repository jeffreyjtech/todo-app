'use strict';

const supertest = require('supertest');
const { app } = require('../server.js');
const request = supertest(app);

const user = { 
  username: 'testUsername', 
  password: 'password',
};

let testUser;
let testItemId; 

describe('Content Routes functionality with login token', () => {
  test('Should post a todo item', async () => {
    testUser = await request.post('/signup').send(user);
    testUser = testUser.body;

    const response = await request
      .post('/todo')
      .set('authorization', `Bearer ${testUser.token}`)
      .send({
        text: 'Our first todo item',
      });
    
      
      expect(response.status).toBe(201); 
      expect(response.body.text).toBe('Our first todo item');
      expect(response.body.id).toBeTruthy();
      testItemId = response.body.id;
    });

  test('Should get todo', async () => {
    let response = await request.get('/todo').set('authorization', `Bearer ${testUser.token}`);

    expect(response.status).toBe(200);
    expect(response.body[0].text).toBeTruthy();
  });

  test('Should get one todo item', async () => {
    let response = await request.get(`/todo/${testItemId}`).set('Authorization', `Bearer ${testUser.token}`);

    expect(response.status).toBe(200);
    expect(response.body.id).toBe(testItemId);
  });

  test('Should update a todo item', async () => {
    let response = await request.put(`/todo/${testItemId}`).set('Authorization', `Bearer ${testUser.token}`).send({
      complete: true,
    });
    
    expect(response.status).toBe(200);
    expect(response.body.complete).toBe(true);
  });

  test('Should delete a todo item', async () => {
    let response = await request.delete(`/todo/${testItemId}`).set('Authorization', `Bearer ${testUser.token}`);

    expect(response.status).toBe(204);
  });

  test('Should send 403 code when there is no authorization', async () => {
    const response = await request
      .post('/todo')
      .send({
        text: 'Our first todo item',
      });
    
    expect(response.status).toBe(403);
  });

  test('Should send 403 code where token is invalid', async () => {
    const response = await request
      .post('/todo')
      .set('authorization', 'Bearer bAdToKEn')
      .send({
        text: 'Our first todo item',
      });
    
    expect(response.status).toBe(403);
  });
});

describe('Testing with invalid requests', () => {
  test('Should post a todo item', async () => {

    const response = await request
      .post('/todo')
      .set('authorization', `Bearer ${testUser.token}`)
      .send({
        // purposely creating an empty object to induce an error
      });
    
    expect(response.status).toBe(500); 
  });

  test('Should not get a todo item if it does not exist', async () => {
    let response = await request
      .get('/todo/1999')
      .set('authorization', `Bearer ${testUser.token}`);

    expect(response.status).toBe(500);
  });

  test('Should not delete a todo item if id is invalid', async () => {
    let response = await request.delete('/todo/1999').set('authorization', `Bearer ${testUser.token}`);

    expect(response.status).toBe(500);
  });

  test('Should not update a todo item if id is invalid', async () => {
    let response = await request.put('/todo/1999').set('authorization', `Bearer ${testUser.token}`);

    expect(response.status).toBe(500);
  });

  test('Should not update a todo item if update body data is invalid', async () => {
    let response = await request
      .post('/todo')
      .set('authorization', `Bearer ${testUser.token}`)
      .send({
        text: 'Our test todo item',
      });
    let id = response.body.id;  

    response = await request.put(`/todo/${id}`).set('Authorization', `Bearer ${testUser.token}`).send({
      text: null,
    });

    expect(response.status).toBe(500);
  });

});
