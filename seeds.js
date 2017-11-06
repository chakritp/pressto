const
  mongoose = require('mongoose'),
  MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/pressto',
  User = require('./models/User.js'),
  MenuItem = require('./models/MenuItem.js'),
  Order = require('./models/Order.js')

mongoose.connect(MONGODB_URI, (err) => {
  console.log(err || `Connected to DB at ${MONGODB_URI}`)
})

var user1 = {
  firstName: "Chakrit",
  lastName: "Prasatwattana",
  email: "chakrit@test.com",
  password: "password"
}

var menuItem1 = {
	name: "Caramel Macchiato",
	price: "5.99",
	description: "One shot of espresso with caramel syrup",
	image: "https://s3-us-west-2.amazonaws.com/bakingmischief/wp-content/uploads/2016/01/10081335/better-than-starbucks-caramel-macchiato-image-square.jpg",
	category: "Hot"
}

var menuItem2 = {
  name: "Matcha Latte",
  price: "5.99",
  description: "Ice matcha green tea with milk",
  image: "https://cdn.shopify.com/s/files/1/0368/5017/files/iced-matcha-latte-movie-still001_1024x1024.jpg?v=1491350684",
  category: "Iced"
}

var menuItem2 = {
  name: "Blueberry Muffin",
  price: "5.99",
  description: "Natural grains with fresh blueberries",
  image: "https://sparkpeo.hs.llnwd.net/e2/guid/100-Calorie-Blueberry-Muffins/83454cbe-efb5-4c7e-9d23-57e74ac089c9.jpg",
  category: "Food"
}

///////// User /////////
User.findOne({firstName: user1.firstName}, (err, user) => {
  if(user){
    User.create(menuItem1, (err, user) => {
      if(err) return console.log(err)
      console.log("user 1 created")
    })
  }
})

///////// Menu Items /////////
MenuItem.findOne({name: menuItem1.name}, (err, menuItem) => {
  if(menuItem){
    MenuItem.create(menuItem1, (err, menuItem) => {
      if(err) return console.log(err)
      console.log("menu item 1 created")
    })
  }
})

MenuItem.findOne({ name: menuItem2.name }, (err, menuItem) => {
  if (menuItem) {
    MenuItem.create(menuItem2, (err, menuItem) => {
      if (err) return console.log(err)
      console.log("menu item 2 created")
    })
  }
})

MenuItem.findOne({ name: menuItem3.name }, (err, menuItem) => {
  if(menuItem) {
    MenuItem.create(menuItem3, (err, menuItem) => {
      if (err) return console.log(err)
      console.log("menu item 3 created")
    })
  }
})





///////// Order /////////
