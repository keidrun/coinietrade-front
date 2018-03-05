const User = require('../models/User');
const keys = require('../config/keys').get(process.env.NODE_ENV);

const auth = (req, res, next) => {
  const token = req.cookies[keys.cookieKey];

  User.findByToken(token, (err, user) => {
    if (err) throw err;

    if (!user) return res.status(401).send({ message: 'Login Required' });

    req.token = token;
    req.user = user;

    next();
  });
};

module.exports = auth;
