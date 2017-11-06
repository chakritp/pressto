const
  mongoose = require('mongoose'),
  MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/pressto',
  User = require('./models/User.js'),
  MenuItem = require('./models/MenuItem.js'),
  Order = require('./models/Order.js'),

mongoose.connect(MONGODB_URI, (err) => {
  console.log(err || `Connected to DB at ${MONGODB_URI}`)
})

