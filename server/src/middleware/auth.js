const { User } = require('../models/User');
const keys = require('../../config/keys').get(process.env.NODE_ENV);

const auth = async (req, res, next) => {
  const token = req.cookies[keys.cookieKey];

  try {
    const user = await User.findByToken(token);
    if (!user) {
      return res.status(401).json({
        errors: [
          {
            message: 'Login Required.',
            errorType: 'clientError',
          },
        ],
      });
    }

    req.token = token;
    req.user = user;

    return next();
  } catch (error) {
    return next(error);
  }
};

module.exports = auth;
