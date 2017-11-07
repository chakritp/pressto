const
  express = require('express'),
  app = express(),
  logger = require('morgan'),
  bodyParser = require('body-parser'),
  mongoose = require('mongoose'),
  dotenv = require('dotenv').config(),
  MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/pressto'
  PORT = process.env.PORT || 3001,
  keyPublishable = process.env.STRIPE_PUBLISHABLE_KEY,
  keySecret = process.env.STRIPE_SECRET_KEY,
  stripe = require('stripe')(keySecret),
  usersRoutes = require('./routes/users.js'),
  productsRoutes = require('./routes/products.js'),
  ordersRoutes = require('./routes/orders.js')


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
app.use('/api/orders', ordersRoutes)

app.post('/api/charge', (req, res) => {
  let amount = 500
  console.log('***********HERE***************')
  console.log(req.body)
  stripe.charges.create({
    amount: req.body.amount,
    description: req.body.description,
    source: req.body.token.id,
    currency: 'usd'
  }, (err, charge) => {
    if(err) return res.json({success: false, error: err})
    res.json({ success: true, charge })
  })
})



app.listen(PORT, (err) => {
  console.log(err || `Server running on port ${PORT}`)
})