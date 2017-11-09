const
  Product = require('../models/Product.js')

module.exports = {
  index: (req, res) => {
    Product.find({}, (err, products) => {
      if(err) return res.json({ success: false, message: "Something went wrong. Please try again." })
      res.json({ success: true, products })
    })
  },

  show: (req, res) => {
    Product.findById(req.params.id, (err, product) => {
      if(err) return res.json({ success: false, message: "Something went wrong. Please try again." })
      res.json({ success: true, product })
    })
  },

  create: (req, res) => {
    Product.create(req.body, (err, product) => {
      if(err) return res.json({ success: false, message: "Something went wrong. Please try again." })
      res.json({ success: true, message: "Successfully created menu item", product })
    })
  },

  update: (req, res) => {
    Product.findByIdAndUpdate(req.params.id, req.body, { new: true}, (err, product) => {
      if(err) return res.json({ success: false, message: "Something went wrong. Please try again." })
      res.json({ success: true, message: "Successfully updated menu item", product })
    })
  },

  destroy: (req, res) => {
    Product.findByIdAndRemove(req.params.id, (err, product) => {
      if (err) return res.json({ success: false, message: "Something went wrong. Please try again." })
      res.json({ success: true, message: "Successfully destroyed menu item", product })
    })
  }
}