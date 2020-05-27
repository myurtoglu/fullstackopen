const usersRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')

usersRouter.get('/', async (request, response) => {
  const users = await User
    .find({})
    .populate('blogs', { url: 1, title: 1, author: 1 })
  response.json(users)
})

usersRouter.post('/', async (request, response) => {
  const body = request.body
  const saltRounds = 10
  const pwd = body.password
  if (pwd === undefined || pwd.length < 3) {
    return response.status(400).json({
      error: 'password is required and must be at least 3 characters long.'
    })
  }
  const passwordHash = await bcrypt.hash(pwd, saltRounds)

  const newUser = new User({
    username: body.username,
    name: body.name,
    passwordHash: passwordHash,

  })
  const savedUser = await newUser.save()
  response.json(savedUser)
})

module.exports = usersRouter