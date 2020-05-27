const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')

const api = supertest(app)

const blogs = [
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    __v: 0
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  },
  {
    _id: '5a422b3a1b54a676234d17f9',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
    __v: 0
  },
  {
    _id: '5a422b891b54a676234d17fa',
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
    __v: 0
  },
  {
    _id: '5a422ba71b54a676234d17fb',
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0,
    __v: 0
  },
  {
    _id: '5a422bc61b54a676234d17fc',
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
    __v: 0
  }
]

beforeEach(async () => {
  await Blog.deleteMany({})
  await Promise.all(blogs.map(blog => new Blog(blog)).map(blog => blog.save()))
  await User.deleteMany({})
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('correct number of blogs are returned', async () => {
  const response = await api.get('/api/blogs')
  const blogsInResponse = response.body
  expect(blogsInResponse.length).toBe(blogs.length)
})

test('unique id property of the posts is named id', async () => {
  const response = await api.get('/api/blogs')
  const blogsInResponse = response.body
  blogsInResponse.forEach(blog => {
    expect(blog.id).toBeDefined()
  })
})

test('able to create a new blog post', async () => {
  const newPost = {
    title: 'Test Post',
    author: 'Test Author',
    url: 'https://test.com/',
    likes: 1,
  }

  const token = await generateValidToken()

  await api
    .post('/api/blogs')
    .set('Authorization', `bearer ${token}`)
    .send(newPost)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')
  const blogsInResponse = response.body
  expect(blogsInResponse.length).toBe(blogs.length + 1)
  expect(blogsInResponse.map(blog => blog.title)).toContain(newPost.title)
})

test('unable to create a new blog post if token not provided', async () => {
  const newPost = {
    title: 'Test Post',
    author: 'Test Author',
    url: 'https://test.com/',
    likes: 1,
  }

  await api
    .post('/api/blogs')
    .send(newPost)
    .expect(401)
})

test('if likes is missing, it defaults to 0', async () => {
  const newPost = {
    title: 'Test Post',
    author: 'Test Author',
    url: 'https://test.com/',
  }

  await Blog.deleteMany({})
  const token = await generateValidToken()

  await api
    .post('/api/blogs')
    .set('Authorization', `bearer ${token}`)
    .send(newPost)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')
  const blogsInResponse = response.body
  expect(blogsInResponse.length).toBe(1)
  expect(blogsInResponse[0].likes).toBe(0)
})

test('if title is missing, responds with error', async () => {
  const newPost = {
    author: 'Test Author',
    url: 'https://test.com/',
  }
  await Blog.deleteMany({})
  const token = await generateValidToken()

  await api
    .post('/api/blogs')
    .set('Authorization', `bearer ${token}`)
    .send(newPost)
    .expect(400)
})

test('if url is missing, responds with error', async () => {
  const newPost = {
    title: 'Test Post',
    author: 'Test Author',
  }
  await Blog.deleteMany({})
  const token = await generateValidToken()

  await api
    .post('/api/blogs')
    .set('Authorization', `bearer ${token}`)
    .send(newPost)
    .expect(400)
})

test('delete succeeds with 204 if id is valid', async () => {
  const originalPost = {
    title: 'Test Post',
    author: 'Test Author',
    url: 'https://test.com/',
    likes: 0,
  }
  await Blog.deleteMany({})
  const token = await generateValidToken()

  await api
    .post('/api/blogs')
    .set('Authorization', `bearer ${token}`)
    .send(originalPost)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const initialBlogs = await blogsInDb()
  const blogToDelete = initialBlogs[0]

  await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .set('Authorization', `bearer ${token}`)
    .expect(204)

  const finalBlogs = await blogsInDb()
  expect(finalBlogs).toHaveLength(initialBlogs.length - 1)
  expect(finalBlogs.map(blog => blog.title)).not.toContain(blogToDelete.title)
})

afterAll(() => {
  mongoose.connection.close()
})

test('put succeeds if id is valid', async () => {
  const originalPost = {
    title: 'Test Post',
    author: 'Test Author',
    url: 'https://test.com/',
    likes: 0,
  }
  await Blog.deleteMany({})
  const token = await generateValidToken()

  await api
    .post('/api/blogs')
    .set('Authorization', `bearer ${token}`)
    .send(originalPost)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const updatedPost = {
    title: 'Test Post',
    author: 'Test Author',
    url: 'https://test.com/',
    likes: 5,
  }

  const initialBlogs = await blogsInDb()
  const blogToUpdate = initialBlogs[0]

  await api
    .put(`/api/blogs/${blogToUpdate.id}`)
    .send(updatedPost)
    .expect(200)

  const updatedBlogPost = await blogsInDb()
  expect(updatedBlogPost[0].likes).toBe(updatedPost.likes)
})

// Helpers

const blogsInDb = async () => {
  const response = await api.get('/api/blogs')
  return response.body
}

const generateValidToken = async () => {
  const newUser = {
    username: 'test',
    name: 'test',
    password: 'pwd',
  }
  await api.post('/api/users').send(newUser)

  const user = {
    username: 'test',
    password: 'pwd',
  }
  return (await api.post('/api/login').send(user)).body.token
}