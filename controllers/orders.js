const
  Order = require('../models/Order.js')

module.exports = {
  index: (req, res) => {
    Order.find({}).populate('product').exec((err, orders) => {
      if (err) return res.json({ success: false, message: "Something went wrong. Please try again." })
      res.json({ success: true, orders })
    })
  },

  show: (req, res) => {
    Order.find(req.params.id, (err, order) => {
      if (err) return res.json({ success: false, message: "Something went wrong. Please try again." })
      res.json({ success: true, order })
    })
  },

  create: (req, res) => {
    Order.create(req.body, (err, order) => {
      if (err) return res.json({ success: false, message: "Something went wrong. Please try again.", error: err })

      // io.emit('new-order', order)
      res.json({ success: true, message: "Successfully created order", order })
    })
  },

  update: (req, res) => {
    Order.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, order) => {
      if (err) return res.json({ success: false, message: "Something went wrong. Please try again." })
      res.json({ success: true, message: "Successfully updated order", order })
    })
  },

  destroy: (req, res) => {
    Order.findByIdAndRemove(req.params.id, (err, order) => {
      if (err) return res.json({ success: false, message: "Something went wrong. Please try again." })
      res.json({ success: true, message: "Successfully destroyed order", order })
    })
  }
}