const express = require('express')
require('express-async-errors')
const app = express()
const config = require('./utils/config')
const cors = require('cors')
const blogRouter = require('./controllers/blogrouter')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const mongoose = require('mongoose')
const middleware = require('./utils/middleware')

mongoose.set('useFindAndModify', false)
mongoose.set('useCreateIndex', true)

mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })

app.use(cors())
app.use(express.json())
app.use(middleware.requestLogger)

app.use('/api/blogs', blogRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app