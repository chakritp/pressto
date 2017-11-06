const
  mongoose = require('mongoose'),
  productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    category: {type: String, default: "Other"}, 
    description: String,
    image: { type: String }
  }, { timestamps: true })

module.exports = mongoose.model('Product', productSchema)