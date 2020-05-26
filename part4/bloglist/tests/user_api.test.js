const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const User = require('../models/user')

const api = supertest(app)

beforeEach(async () => {
  await User.deleteMany({})
})

test('able to create a new user', async () => {
  const newUser = {
    username: 'test',
    name: 'test',
    password: 'pwd',
  }

  await api
    .post('/api/users')
    .send(newUser)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/users')
  const usersInResponse = response.body
  expect(usersInResponse.length).toBe(1)
})

test('username must be unique', async () => {
  const newUser = {
    username: 'test',
    name: 'test',
    password: 'pwd',
  }

  await api
    .post('/api/users')
    .send(newUser)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const newUser2 = {
    username: 'test',
    name: 'test',
    password: 'pwd',
  }

  await api
    .post('/api/users')
    .send(newUser2)
    .expect(400)
    .expect('Content-Type', /application\/json/)
    .expect(res => {
      if (!res.body.error.includes('expected `username` to be unique')) {
        throw new Error('Wrong error message.')
      }
    })
})

test('password is rquired', async () => {
  const newUser = {
    username: 'test',
    name: 'test',
  }

  await api
    .post('/api/users')
    .send(newUser)
    .expect(400)
    .expect('Content-Type', /application\/json/)
    .expect(res => {
      if (!res.body.error.includes(
        'password is required and must be at least 3 characters long'))
      {
        throw new Error('Wrong error message.')
      }
    })
})

test('password must be valid', async () => {
  const newUser = {
    username: 'test',
    name: 'test',
    password: 'pw',
  }

  await api
    .post('/api/users')
    .send(newUser)
    .expect(400)
    .expect('Content-Type', /application\/json/)
    .expect(res => {
      if (!res.body.error.includes(
        'password is required and must be at least 3 characters long'))
      {
        throw new Error('Wrong error message.')
      }
    })
})

afterAll(() => {
  mongoose.connection.close()
})