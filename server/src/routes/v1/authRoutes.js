const { Router } = require('express');
const auth = require('../../middleware/auth');
const { AuthController } = require('../../controllers');

const authRoutes = new Router();

authRoutes.get('/', auth, AuthController.find);
authRoutes.get('/logout', auth, AuthController.logout);

module.exports = authRoutes;
