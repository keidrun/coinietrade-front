const { Router } = require('express');
const { auth } = require('../../middleware');
const { EventsController } = require('../../controllers');

const eventRoutes = new Router();

eventRoutes.get('/', auth, EventsController.find);

module.exports = eventRoutes;
