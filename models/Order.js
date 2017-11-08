const
  mongoose = require('mongoose'),
  orderSchema = new mongoose.Schema({
    stripeId: { type: String, required: true },
    customer: {
      name: { type: String, required: true},
      telephone: String
    },
    items: [{
      quantity: { type: Number, default: 1 },
      product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' }
    }],
    status: { type: String, default: "pending" }//pending, inProgress, ready, done
  }, { timestamps: true })

module.exports = mongoose.model('Order', orderSchema)