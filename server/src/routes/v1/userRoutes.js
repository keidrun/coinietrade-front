const { Router } = require('express');
const { authorize, handleValidationErrors } = require('../../middleware');
const { PRIVILEGE_PERMISSIONS } = require('../../models');
const { updateUserValidator } = require('../../middleware/validators');
const { UserController } = require('../../controllers');

const userRoutes = new Router();

userRoutes.get('/', authorize(PRIVILEGE_PERMISSIONS.USER), UserController.find);
userRoutes.put(
  '/',
  authorize(PRIVILEGE_PERMISSIONS.USER),
  updateUserValidator,
  handleValidationErrors,
  UserController.update,
);
userRoutes.delete(
  '/',
  authorize(PRIVILEGE_PERMISSIONS.USER),
  UserController.remove,
);

module.exports = userRoutes;
