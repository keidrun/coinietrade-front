const User = require('../models/User');
const auth = require('../middleware/auth');

module.exports = app => {
  app.post('/api/user', auth, (req, res) => {});

  app.delete('/api/user', auth, (req, res) => {});
};
