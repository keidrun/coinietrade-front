const { Setting } = require('../../models/Setting');
const { User } = require('../../models/User');
const auth = require('../../middleware/auth');

const RESOURCE_NAME = 'setting';
const VERSION = 'v1';
const URI = `/api/${VERSION}/${RESOURCE_NAME}`;

module.exports = app => {
  app.post(URI, auth, async (req, res) => {
    let setting;
    try {
      setting = await new Setting(req.body).save();
      await User.findByIdAndUpdate(req.user._id, {
        settingId: setting._id,
      });
      return res.send(setting);
    } catch (err) {
      if (setting !== undefined) {
        try {
          await Setting.findByIdAndRemove(setting._id);
        } catch (err) {
          return res.status(400).json({
            errors: {
              route: {
                msg: err.message,
              },
            },
          });
        }
      }
      return res.status(400).json({
        errors: {
          route: {
            msg: err.message,
          },
        },
      });
    }
  });

  app.get(URI, auth, async (req, res) => {
    try {
      const user = await User.findById(req.user._id);
      const setting = await Setting.findById(user.settingId);
      if (!user || !setting) {
        return res.status(404).json({
          errors: {
            route: {
              msg: 'Not the setting data found.',
            },
          },
        });
      }
      return res.send(setting);
    } catch (err) {
      return res.status(400).json({
        errors: {
          route: {
            msg: err.message,
          },
        },
      });
    }
  });

  app.put(URI, auth, async (req, res) => {
    try {
      const user = await User.findById(req.user._id);
      const updatedSetting = await Setting.findByIdAndUpdate(
        user.settingId,
        req.body,
        { new: true },
      );
      return res.send(updatedSetting);
    } catch (err) {
      return res.status(400).json({
        errors: {
          route: {
            msg: err.message,
          },
        },
      });
    }
  });

  app.delete(URI, auth, async (req, res) => {
    try {
      const user = await User.findById(req.user._id);
      const deletedSetting = await Setting.findByIdAndRemove(user.settingId);
      await User.findByIdAndUpdate(req.user._id, {
        $unset: { settingId: 1 },
      });
      return res.send(deletedSetting);
    } catch (err) {
      return res.status(400).json({
        errors: {
          route: {
            msg: err.message,
          },
        },
      });
    }
  });
};
