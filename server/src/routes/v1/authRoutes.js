const passport = require('passport');
const keys = require('../../../config/keys').get(process.env.NODE_ENV);
const auth = require('../../middleware/auth');

const RESOURCE_NAME = 'auth';
const VERSION = 'v1';
const URI = `/api/${VERSION}/${RESOURCE_NAME}`;

module.exports = app => {
  app.get(URI, auth, (req, res) => {
    const { user } = req;
    if (!user) {
      return res.status(404).json({
        errors: [
          {
            message: 'Not the user data found.',
            errorType: 'clientError',
          },
        ],
      });
    }

    return res.json({
      id: user._id,
      displayName: user.displayName,
      avatarUrl: user.avatarUrl,
    });
  });

  // Logout
  app.get(`${URI}/logout`, auth, async (req, res) => {
    const { user } = req;

    req.logout(); // clear cookie['user'] with passport

    try {
      await user.deleteToken();
      res.clearCookie(keys.cookieKey);
      return res.redirect('/');
    } catch (err) {
      return res.status(400).json({
        errors: [
          {
            message: err.message,
            errorType: 'clientError',
          },
        ],
      });
    }
  });

  // Facebook auth route
  app.get(
    '/auth/facebook',
    passport.authenticate('facebook', {
      scope: ['public_profile', 'email'],
    }),
  );

  app.get(
    '/auth/facebook/callback',
    passport.authenticate('facebook'),
    (req, res) => {
      const { token } = req.user;
      return res.cookie(keys.cookieKey, token).redirect('/dashboard');
    },
  );

  // Google auth route
  app.get(
    '/auth/google',
    passport.authenticate('google', {
      scope: ['profile', 'email'],
    }),
  );

  app.get(
    '/auth/google/callback',
    passport.authenticate('google'),
    (req, res) => {
      const { token } = req.user;
      return res.cookie(keys.cookieKey, token).redirect('/dashboard');
    },
  );
};
