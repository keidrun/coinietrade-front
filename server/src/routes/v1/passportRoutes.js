const { Router } = require('express');
const passport = require('passport');
const { PassportController } = require('../../controllers');

const passportRoutes = new Router();

passportRoutes.get(
  '/facebook',
  passport.authenticate('facebook', {
    scope: ['public_profile', 'email'],
  }),
);

passportRoutes.get(
  '/facebook/callback',
  passport.authenticate('facebook'),
  PassportController.redirectDashboard,
);

passportRoutes.get(
  '/google',
  passport.authenticate('google', {
    scope: ['profile', 'email'],
  }),
);

passportRoutes.get(
  '/google/callback',
  passport.authenticate('google'),
  PassportController.redirectDashboard,
);

module.exports = passportRoutes;
