const { Router } = require('express');
const { auth } = require('../../middleware');
const { AuthController } = require('../../controllers');

const authRoutes = new Router();

authRoutes.get('/', auth, AuthController.findLoggedInUser);
authRoutes.get('/logout', auth, AuthController.logout);

module.exports = authRoutes;
