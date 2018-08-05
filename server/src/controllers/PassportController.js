const keys = require('../../config/keys').get(process.env.NODE_ENV);

const cookieOptions = {
  maxAge: 60 * 60 * 24 * 30 * 1000, // 1 month
};

class PassportController {
  static redirectDashboard(req, res) {
    const { token } = req.user;
    return res
      .cookie(keys.cookieKey, token, cookieOptions)
      .redirect('/dashboard');
  }
}

module.exports = PassportController;
