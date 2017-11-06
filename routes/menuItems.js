const
  express = require('express'),
  menuItemsRouter = new express.Router(),
  menuItemsCtrl = require('../controllers/menuItems.js'),
  verifyToken = require('../serverAuth.js').verifyToken

menuItemsRouter.route('/')
  .get(menuItemsCtrl.index)
  .post(menuItemsCtrl.create)

menuItemsRouter.route('/:id')
  .get(menuItemsCtrl.show)
  .patch(menuItemsCtrl.update)
  .delete(menuItemsCtrl.destroy)

// menuItemsRouter.get('/:id/edit', menuItemsRouter.edit)

module.exports = menuItemsRouter