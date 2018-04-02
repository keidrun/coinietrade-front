const User = require('../../models/User');
const auth = require('../../middleware/auth');
const {
  validateUserSchema,
  handleValidationErrors
} = require('../../middleware/validationHandlers');

const RESOURCE_NAME = 'user';
const VERSION = 'v1';
const URI = `/api/${VERSION}/${RESOURCE_NAME}`;

module.exports = app => {
  app.get(URI, auth, async (req, res) => {
    try {
      const user = await User.findById(req.user._id);
      res.send(user);
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

  app.put(
    URI,
    auth,
    validateUserSchema,
    handleValidationErrors,
    async (req, res) => {
      try {
        const updatedUser = await User.findByIdAndUpdate(
          req.user._id,
          req.body,
          {
            new: true
          }
        );
        res.send(updatedUser);
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
  );

  app.delete(URI, auth, async (req, res) => {
    try {
      const deletedUser = await User.findByIdAndRemove(req.user._id);
      res.send(deletedUser);
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
