const { Router } = require('express');
const { auth, handleValidationErrors } = require('../../middleware');
const { updateUserValidator } = require('../../middleware/validators');
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
