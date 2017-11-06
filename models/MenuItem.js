const
  mongoose = require('mongoose'),
  menuItemSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: String,
    image: { type: String, required: true}
  }, { timestamps: true })

module.exports = mongoose.model('MenuItem', menuItemSchema)