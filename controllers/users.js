const
  User = require('../models/User.js'),
  signToken = require('../serverAuth.js').signToken

module.exports = {
  index: (req, res) => {
    User.find({}, (err, users) => {
      if(err) return res.json({success: false, message: "Something went wrong. Please try again."})
      res.json({success: true, users})
    })
  },

  show: (req, res) => {
    User.find(req.params.id, (err, user) => {
      if(err) return res.json({ success: false, message: "Something went wrong. Please try again." })
      res.json({success: user})
    })
  },

  create: (req, res) => {
    User.create(req.body, (err, user) => {
      if(err) return res.json({ success: false, code: err.code })
      res.json({success: true, message: "User created", user})
    })
  },

  edit: (req, res) => {
    User.findById(req.params.id, (err, user) => {
      if(err) return res.json({success: false, code: err.code})
      res.json({success: true, user})
    })
  },

  update: (req, res) => {
    User.findById(req.params.id, (err, user) => {
      Object.assign(user, req.body)
      user.save((err, updatedUser) => {
        res.json({success: true, message: "User updated", user})
      })
    })
  },

  destroy: (req, res) => {
    User.findByIdAndRemove(req.params.id, (err, user) => {
      if(err) return res.json({success: false, code: err.code})
      res.json({success: true, user})
    })
  },

  authenticate: (req, res) => {
    User.findOne({email: req.body.email}, (err, user) => {
      if(!user || !user.validPassword(req.body.password)) {
        return res.json({success: false, message: "Invalid credentials"})
      }

      const token = signToken(user)
      res.json({success: true, message: "Token attached", token})
    })
  }
}