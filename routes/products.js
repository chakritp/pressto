const
  express = require('express'),
  productsRouter = new express.Router(),
  productsCtrl = require('../controllers/products.js'),
  verifyToken = require('../serverAuth.js').verifyToken

productsRouter.route('/')
  .get(productsCtrl.index)
  .post(productsCtrl.create)

productsRouter.route('/:id')
  .get(productsCtrl.show)
  .patch(productsCtrl.update)
  .delete(productsCtrl.destroy)

// productsRouter.get('/:id/edit', productsRouter.edit)

module.exports = productsRouter