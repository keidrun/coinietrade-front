const Setting = require('../models/Setting');
const User = require('../models/User');
const auth = require('../middleware/auth');

module.exports = app => {
  app.post('/api/setting', auth, async (req, res) => {
    let setting;
    try {
      setting = await new Setting(req.body).save();
      const updatedUser = await User.findByIdAndUpdate(req.user._id, {
        settingId: setting._id
      });
      res.send(setting);
    } catch (err) {
      if (setting !== undefined) {
        try {
          const deletedSetting = await Setting.findByIdAndRemove(setting._id);
        } catch (err) {
          res.status(400).json({
            errors: {
              route: {
                msg: err.message
              }
            }
          });
        }
      }
      res.status(400).json({
        errors: {
          route: {
            msg: err.message
          }
        }
      });
    }
  });

  app.get('/api/setting', auth, async (req, res) => {
    try {
      const user = await User.findById(req.user._id);
      const setting = await Setting.findById(user.settingId);
      if (!user || !setting) {
        return res.status(404).json({
          errors: {
            route: {
              msg: 'Not the setting data found.'
            }
          }
        });
      }
      res.send(setting);
    } catch (err) {
      res.status(400).json({
        errors: {
          route: {
            msg: err.message
          }
        }
      });
    }
  });

  app.put('/api/setting', auth, async (req, res) => {
    try {
      const user = await User.findById(req.user._id);
      const updatedSetting = await Setting.findByIdAndUpdate(
        user.settingId,
        req.body,
        { new: true }
      );
      res.send(updatedSetting);
    } catch (err) {
      res.status(400).json({
        errors: {
          route: {
            msg: err.message
          }
        }
      });
    }
  });

  app.delete('/api/setting', auth, async (req, res) => {
    try {
      const user = await User.findById(req.user._id);
      const deletedSetting = await Setting.findByIdAndRemove(user.settingId);
      const deletedUser = await User.findByIdAndUpdate(req.user._id, {
        $unset: { settingId: 1 }
      });
      res.send(deletedSetting);
    } catch (err) {
      res.status(400).json({
        errors: {
          route: {
            msg: err.message
          }
        }
      });
    }
  });
};
