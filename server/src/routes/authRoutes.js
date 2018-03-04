const passport = require('passport');
const keys = require('../config/keys').get(process.env.NODE_ENV);
const auth = require('../middleware/auth');
const User = require('../models/User');

module.exports = app => {
  // Facebook auth route
  app.get(
    '/auth/facebook',
    passport.authenticate('facebook', {
      scope: ['public_profile', 'email']
    })
  );

  app.get(
    '/auth/facebook/callback',
    passport.authenticate('facebook'),
    (req, res) => {
      const user = req.user;
      res.cookie(keys.cookieKey, user.token).json({
        isAuth: true,
        id: user._id
      });
    }
  );

  // Google auth route
  app.get(
    '/auth/google',
    passport.authenticate('google', {
      scope: ['profile', 'email']
    })
  );

  app.get(
    '/auth/google/callback',
    passport.authenticate('google'),
    (req, res) => {
      const user = req.user;
      res.cookie(keys.cookieKey, user.token).json({
        isAuth: true,
        id: user._id
      });
    }
  );

  // Logout
  app.get('/api/logout', auth, (req, res) => {
    req.logout();
    User.deleteToken(req.token, (err, user) => {
      if (err) return res.status(400).send(err);

      res.sendStatus(200);
    });
  });

  // Check auth status
  app.get('/api/auth', auth, (req, res) => {
    res.json({
      isAuth: true,
      id: req.user._id,
      displayName: req.user.displayName,
      avatarUrl: req.user.avatarUrl
    });
  });
};
