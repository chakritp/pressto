const
  express = require('express'),
  app = express(),
  logger = require('morgan'),
  bodyParser = require('body-parser'),
  mongoose = require('mongoose'),
  dotenv = require('dotenv').config(),
  MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/pressto',
  // SOCKET_PORT = process.env.SOCKET_PORT || 3002,
  PORT = process.env.PORT || 3001,
  keyPublishable = process.env.STRIPE_PUBLISHABLE_KEY,
  keySecret = process.env.STRIPE_SECRET_KEY,
  stripe = require('stripe')(keySecret),
  http = require('http').Server(app)
  io = require('socket.io')(http),
  usersRoutes = require('./routes/users.js'),
  productsRoutes = require('./routes/products.js'),
  ordersRoutes = require('./routes/orders.js'),
  Order = require('./models/Order')


mongoose.connect(MONGODB_URI, (err) => {
  console.log(err || `Connected to MONGODB: ${MONGODB_URI}`)
})

app.use(express.static(`${__dirname}/client/build`)) //applies to the deployed application
app.use(logger('dev'))
app.use(bodyParser.json())

app.get('/api', (req, res) => {
  res.json('API root')
})

app.use('/api/users', usersRoutes)
app.use('/api/products', productsRoutes)

// attach io server to request object for orders create route
app.use((req, res, next) => {
  req.io = io
  next()
})

app.use('/api/orders', ordersRoutes)

app.post('/api/charge', (req, res) => {
  console.log('***********HERE***************')
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


// web socket server
io.on('connection', (client) => {
  console.log('client connected')
  Order.find({}).populate('items.product').exec((err, orders) => {
    if(err) return console.log(err)
    io.emit('orders', orders)
  })

  // listen when client clicks on 'move to inprogress'
  client.on('move-to-inprogress', (id) => {
    Order.findByIdAndUpdate(id, {status: 'in-progress'} , { new: true }, (err, order) => {
      if(err) return console.log(err)
      Order.find({}).populate('items.product').exec((err, orders) => {
        if (err) return console.log(err)
        io.emit('orders', orders)
      })
    })
  })

  // listen when client clicks on 'move to done'
  client.on('move-to-done', (id) => {
    Order.findByIdAndUpdate(id, { status: 'ready' }, { new: true }, (err, order) => {
      if (err) return console.log(err)
      Order.find({}).populate('items.product').exec((err, orders) => {
        if (err) return console.log(err)
        io.emit('orders', orders)
      })
    })
  })

  // listen when client clicks on 'move to archive'
  client.on('move-to-archive', (id) => {
    Order.findByIdAndUpdate(id, { status: 'archived' }, { new: true }, (err, order) => {
      if (err) return console.log(err)
      Order.find({}).populate('items.product').exec((err, orders) => {
        if (err) return console.log(err)
        io.emit('orders', orders)
      })
    })
  })
})


// io.listen(SOCKET_PORT)

//applies to the deployed application
app.use('*', (req, res) => {
  res.sendFile(`${__dirname}/client/build/index.html`)
})

http.listen(PORT, (err) => {
  console.log(err || `Server running on port ${PORT}`)
})