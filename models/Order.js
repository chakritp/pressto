const
  mongoose = require('mongoose'),
  orderSchema = new mongoose.Schema({
    stripeId: { type: Number, required: true },
    customer: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    items: [{
      quantity: { type: Number, default: 1 },
      product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' }
    }],
    status: String //pending, inProgress, ready, done
  }, { timestamps: true })

module.exports = mongoose.model('Order', orderSchema)