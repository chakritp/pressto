const
  mongoose = require('mongoose'),
  MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/pressto',
  User = require('./models/User.js'),
  Product = require('./models/Product.js'),
  Order = require('./models/Order.js')

mongoose.connect(MONGODB_URI, (err) => {
  console.log(err || `Connected to DB at ${MONGODB_URI}`)
})

var user1 = {
  firstName: "Chakrit",
  lastName: "Prasatwattana",
  email: "chakrit@test.com",
  password: "password",
  admin: true
}

var user2 = {
  firstName: "John",
  lastName: "Doe",
  email: "john@test.com",
  password: "password"
}

var product1 = {
	name: "Caramel Macchiato",
	price: "5.99",
	description: "One shot of espresso with caramel syrup",
	image: "https://s3-us-west-2.amazonaws.com/bakingmischief/wp-content/uploads/2016/01/10081335/better-than-starbucks-caramel-macchiato-image-square.jpg",
	category: "Hot"
}

var product2 = {
  name: "Matcha Latte",
  price: "5.99",
  description: "Ice matcha green tea with milk",
  image: "https://cdn.shopify.com/s/files/1/0368/5017/files/iced-matcha-latte-movie-still001_1024x1024.jpg?v=1491350684",
  category: "Iced"
}

var product3 = {
  name: "Blueberry Muffin",
  price: "5.99",
  description: "Natural grains with fresh blueberries",
  image: "https://sparkpeo.hs.llnwd.net/e2/guid/100-Calorie-Blueberry-Muffins/83454cbe-efb5-4c7e-9d23-57e74ac089c9.jpg",
  category: "Food"
}

///////// User /////////
User.findOne({firstName: user1.firstName}, (err, user) => {
  if(!user){
    User.create(user1, (err, user) => {
      if(err) return console.log(err)
      console.log("user 1 created")
    })
  }
})

User.findOne({ firstName: user2.firstName }, (err, user) => {
  if (!user) {
    User.create(user2, (err, user) => {
      if (err) return console.log(err)
      console.log("user 2 created")
    })
  }
})

///////// Menu Items /////////
Product.findOne({name: product1.name}, (err, product) => {
  if(!product){
    Product.create(product1, (err, product) => {
      if(err) return console.log(err)
      console.log("product 1 created")
    })
  }
})

Product.findOne({ name: product2.name }, (err, product) => {
  if(!product) {
    Product.create(product2, (err, product) => {
      if (err) return console.log(err)
      console.log("product 2 created")
    })
  }
})

Product.findOne({ name: product3.name }, (err, product) => {
  if(!product) {
    Product.create(product3, (err, product) => {
      if (err) return console.log(err)
      console.log("product 3 created")
    })
  }
})





///////// Order /////////
