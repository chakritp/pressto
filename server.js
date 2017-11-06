const
  express = require('express'),
  app = express(),
  logger = require('morgan'),
  bodyParser = require('body-parser'),
  mongoose = require('mongoose'),
  MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/pressto'
  PORT = process.env.PORT || 3001,
  usersRoutes = require('./routes/users.js'),
  productsRoutes = require('./routes/products.js')

mongoose.connect(MONGODB_URI, (err) => {
  console.log(err || `Connected to MONGODB: ${MONGODB_URI}`)
})

app.use(logger('dev'))
app.use(bodyParser.json())

app.get('/api', (req, res) => {
  res.json('API root')
})

app.use('/api/users', usersRoutes)
app.use('/api/products', productsRoutes)

app.listen(PORT, (err) => {
  console.log(err || `Server running on port ${PORT}`)
})