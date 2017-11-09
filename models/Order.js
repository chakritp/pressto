const
  mongoose = require('mongoose'),
  itemSchema = new mongoose.Schema({
    quantity: { type: Number, default: 1 },
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' }
  }),
  orderSchema = new mongoose.Schema({
    stripeId: { type: String, required: true },
    customer: {
      name: { type: String, required: true},
      telephone: String
    },
    items: [itemSchema],
    status: { type: String, default: "pending" }//pending, in-progress, ready, archived
  }, { timestamps: true })

module.exports = mongoose.model('Order', orderSchema)