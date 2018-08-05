const { Router } = require('express');
const auth = require('../../middleware/auth');
const handleValidationErrors = require('../../middleware/handleValidationErrors');
const { updateUserValidator } = require('../../validators');
const { UserController } = require('../../controllers');

const userRoutes = new Router();

userRoutes.get('/', auth, UserController.find);
userRoutes.put(
  '/',
  auth,
  updateUserValidator,
  handleValidationErrors,
  UserController.update,
);
userRoutes.delete('/', auth, UserController.remove);

module.exports = userRoutes;
