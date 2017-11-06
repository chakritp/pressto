const
  MenuItem = require('../models/MenuItem.js')

module.exports = {
  index: (req, res) => {
    MenuItem.find({}, (err, menuItems) => {
      if(err) return res.json({ success: false, message: "Something went wrong. Please try again." })
      res.json({ success: true, users })
    })
  },

  show: (req, res) => {

  },

  create: (req, res) => {

  },

  update: (req, res) => {

  },

  destroy: (req, res) => {

  }
}