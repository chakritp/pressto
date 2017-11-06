const
  mongoose = require('mongoose'),
  orderSchema = new mongoose.Schema({
    stripeId: { type: Number, required: true },
    customer: {
      name: { type: String, required: true },
      telephoneNumber: { type: String, required: true }
    },
    menuItems: [
      {
        quantity: { type: Number, default: 1 },
        menuItem: { type: mongoose.Schema.Types.ObjectId, ref: 'MenuItem' }
      }
    ],
    status: String //pending, inProgress, ready, done
  }, { timestamps: true })

module.exports = mongoose.model('Order', orderSchema)