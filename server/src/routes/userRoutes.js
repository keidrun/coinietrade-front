const User = require('../models/User');
const auth = require('../middleware/auth');

module.exports = app => {
  app.get('/api/user', auth, async (req, res) => {
    const userId = req.user._id;
    try {
      const user = await User.findById(userId);
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
    const userId = req.user._id;
    const newData = req.body;

    try {
      const updatedUser = await User.findByIdAndUpdate(userId, newData, {
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
    const userId = req.user._id;

    try {
      const deletedUser = await User.findByIdAndRemove(userId);
      res.send(deletedUser);
    } catch (err) {
      res.status(400).send({
        error: err.message
      });
    }
  });
};
