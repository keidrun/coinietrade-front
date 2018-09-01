const { Router } = require('express');
const { authorize } = require('../../middleware');
const { PRIVILEGE_PERMISSIONS } = require('../../models');
const { EventsController } = require('../../controllers');

const eventsRoutes = new Router();

eventsRoutes.get(
  '/',
  authorize(PRIVILEGE_PERMISSIONS.EVENTS),
  EventsController.find,
);

module.exports = eventsRoutes;
