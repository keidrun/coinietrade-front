const { Router } = require('express');
const passport = require('passport');
const keys = require('../../../config/keys').get(process.env.NODE_ENV);

const cookieOptions = {
  maxAge: 60 * 60 * 24 * 30 * 1000, // 1 month
};

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
  (req, res) => {
    const { token } = req.user;
    return res
      .cookie(keys.cookieKey, token, cookieOptions)
      .redirect('/dashboard');
  },
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
  (req, res) => {
    const { token } = req.user;
    return res
      .cookie(keys.cookieKey, token, cookieOptions)
      .redirect('/dashboard');
  },
);

module.exports = passportRoutes;
