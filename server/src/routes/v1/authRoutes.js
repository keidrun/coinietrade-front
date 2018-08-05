const { Router } = require('express');
const keys = require('../../../config/keys').get(process.env.NODE_ENV);
const auth = require('../../middleware/auth');

const authRoutes = new Router();

authRoutes.get('/', auth, (req, res) => {
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

authRoutes.get('/logout', auth, async (req, res) => {
  const { user } = req;

  req.logout(); // clear cookie['user'] with passport

  try {
    await user.deleteToken();
    res.clearCookie(keys.cookieKey);
    return res.redirect('/');
  } catch (error) {
    return res.status(400).json({
      errors: [
        {
          message: error.message,
          errorType: 'clientError',
        },
      ],
    });
  }
});

module.exports = authRoutes;
