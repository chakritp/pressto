const
  express = require('express'),
  usersRouter = new express.Router(),
  usersCtrl = require('../controllers/users.js'),
  verifyToken = require('../serverAuth.js').verifyToken

// usersRouter.use(verifyToken)
usersRouter.route('/')
  .get(usersCtrl.index)
  .post(usersCtrl.create)

usersRouter.route('/:id')
  .get(usersCtrl.show)
  .patch(usersCtrl.update)
  .delete(usersCtrl.destroy)

usersRouter.get('/:id/edit', usersCtrl.edit)
// usersRouter.post('/authenticate', usersCtrl.authenticate)

module.exports = usersRouter