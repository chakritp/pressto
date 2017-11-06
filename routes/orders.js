const
  express = require('express'),
  ordersRouter = new express.Router(),
  ordersCtrl = require('../controllers/orders.js'),
  verifyToken = require('../serverAuth.js').verifyToken


ordersRouter.route('/')
  .get(ordersCtrl.index)
  .post(ordersCtrl.create)

ordersRouter.route('/:id')
  .get(ordersCtrl.show)
  .patch(ordersCtrl.update)
  .delete(ordersCtrl.destroy)

module.exports = ordersRouter