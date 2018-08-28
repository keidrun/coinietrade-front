const { Router } = require('express');
const { passportService } = require('../../services');
const { PassportController } = require('../../controllers');

const passportRoutes = new Router();

passportRoutes.get('/facebook', passportService.authenticate.withFacebook());

passportRoutes.get(
  '/facebook/callback',
  passportService.authenticate.withFacebook(),
  PassportController.redirectDashboard,
);

passportRoutes.get('/google', passportService.authenticate.withGoogle());

passportRoutes.get(
  '/google/callback',
  passportService.authenticate.withGoogle(),
  PassportController.redirectDashboard,
);

module.exports = passportRoutes;
