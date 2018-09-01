const { User, Privilege } = require('../models');
const keys = require('../../config/keys').get(process.env.NODE_ENV);

const authorize = privilege => async (req, res, next) => {
  const token = req.cookies[keys.cookieKey];

  if (!token) {
    return res.status(401).json({
      errors: [
        {
          message: 'Login Required.',
          errorType: 'clientError',
        },
      ],
    });
  }

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

    // Check privilege
    const userPrivilege = await Privilege.findOne({ role: user.role });
    user.permissions = userPrivilege.permissions || [];
    if (user.permissions.indexOf(privilege) === -1) {
      return res.status(401).json({
        errors: [
          {
            message: "The user doesn't have enough permissions.",
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

module.exports = authorize;
