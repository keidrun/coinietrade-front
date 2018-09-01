const { Router } = require('express');
const { authorize } = require('../../middleware');
const { PRIVILEGE_PERMISSIONS } = require('../../models');
const { AuthController } = require('../../controllers');

const authRoutes = new Router();

authRoutes.get(
  '/',
  authorize(PRIVILEGE_PERMISSIONS.AUTH),
  AuthController.findLoggedInUser,
);
authRoutes.get(
  '/logout',
  authorize(PRIVILEGE_PERMISSIONS.AUTH),
  AuthController.logout,
);

module.exports = authRoutes;
