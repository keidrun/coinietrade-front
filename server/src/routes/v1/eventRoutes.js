const { Router } = require('express');
const auth = require('../../middleware/auth');
const { EventController } = require('../../controllers');

const eventRoutes = new Router();

eventRoutes.get('/', auth, EventController.find);

module.exports = eventRoutes;
