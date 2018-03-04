const User = require('../models/User');

module.exports = app => {
  app.get('/api/users', (req, res) => {
    User.find({}, (err, users) => {
      res.status(200).send(users);
    });
  });
};
