const User = require('../models/User');
const keys = require('../config/keys').get(process.env.NODE_ENV);

const auth = (req, res, next) => {
  const token = req.cookies[keys.cookieKey];

  /* eslint-disable consistent-return */
  User.findByToken(token, (err, user) => {
    /* eslint-enable consistent-return */

    if (err) return next(err);

    if (!user)
      return res.status(401).json({
        errors: {
          route: {
            msg: 'Login Required',
          },
        },
      });

    req.token = token;
    req.user = user;

    next();
  });
};

module.exports = auth;
