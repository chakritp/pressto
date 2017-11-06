const
  MenuItem = require('../models/MenuItem.js')

module.exports = {
  index: (req, res) => {
    MenuItem.find({}, (err, menuItems) => {
      if(err) return res.json({ success: false, message: "Something went wrong. Please try again." })
      res.json({ success: true, menuItems })
    })
  },

  show: (req, res) => {
    MenuItem.find(req.params.id, (err, menuItem) => {
      if(err) return res.json({ success: false, message: "Something went wrong. Please try again." })
      res.json({ success: true, menuItem })
    })
  },

  create: (req, res) => {
    MenuItem.create(req.body, (err, menuItem) => {
      if(err) return res.json({ success: false, message: "Something went wrong. Please try again." })
      res.json({ success: true, message: "Successfully created menu item", menuItem })
    })
  },

  update: (req, res) => {
    MenuItem.findByIdAndUpdate(req.params.id, req.body, { new: true}, (err, menuItem) => {
      if(err) return res.json({ success: false, message: "Something went wrong. Please try again." })
      res.json({ success: true, message: "Successfully updated menu item", menuItem })
    })
  },

  destroy: (req, res) => {
    MenuItem.findByIdAndRemove(req.params.id, (err, menuItem) => {
      if (err) return res.json({ success: false, message: "Something went wrong. Please try again." })
      res.json({ success: true, message: "Successfully destroyed menu item", menuItem })
    })
  }
}