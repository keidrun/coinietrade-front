const { Router } = require('express');
const { auth } = require('../../middleware');
const { EventsController } = require('../../controllers');

const eventsRoutes = new Router();

eventsRoutes.get('/', auth, EventsController.find);

module.exports = eventsRoutes;
