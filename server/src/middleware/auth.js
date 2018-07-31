const { User } = require('../models/User');
const keys = require('../../config/keys').get(process.env.NODE_ENV);

const auth = (req, res, next) => {
  const token = req.cookies[keys.cookieKey];

  // eslint-disable-next-line consistent-return
  User.findByToken(token, (err, user) => {
    if (err) return next(err);

    if (!user)
      return res.status(401).json({
        errors: [
          {
            message: 'Login Required.',
            errorType: 'clientError',
          },
        ],
      });

    req.token = token;
    req.user = user;

    next();
  });
};

module.exports = auth;
