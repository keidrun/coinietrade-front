const User = require('../models/User');
const auth = require('../middleware/auth');

module.exports = app => {
  app.get('/api/user', auth, async (req, res) => {
    try {
      const user = await User.findById(req.user._id);
      res.send(user);
    } catch (err) {
      res.status(400).send({
        error: {
          message: err.message
        }
      });
    }
  });

  app.put('/api/user', auth, async (req, res) => {
    try {
      const updatedUser = await User.findByIdAndUpdate(req.user._id, req.body, {
        new: true
      });
      res.send(updatedUser);
    } catch (err) {
      res.status(400).send({
        error: err.message
      });
    }
  });

  app.delete('/api/user', auth, async (req, res) => {
    try {
      const deletedUser = await User.findByIdAndRemove(req.user._id);
      res.send(deletedUser);
    } catch (err) {
      res.status(400).send({
        error: err.message
      });
    }
  });
};
