const { User } = require('../../models/User');
const auth = require('../../middleware/auth');
const handleValidationErrors = require('../../middleware/handleValidationErrors');
const { updateUserValidator } = require('../../validators');

const RESOURCE_NAME = 'user';
const VERSION = 'v1';
const URI = `/api/${VERSION}/${RESOURCE_NAME}`;

module.exports = app => {
  app.get(URI, auth, async (req, res) => {
    try {
      const user = await User.findById(req.user._id);
      return res.send(user);
    } catch (err) {
      return res.status(400).json({
        errors: [
          {
            message: err.message,
            errorType: 'clientError',
          },
        ],
      });
    }
  });

  app.put(
    URI,
    auth,
    updateUserValidator,
    handleValidationErrors,
    async (req, res) => {
      // TODO Update Secret and Key

      try {
        const updatedUser = await User.findByIdAndUpdate(
          req.user._id,
          req.body,
          {
            new: true,
          },
        );
        return res.send(updatedUser);
      } catch (err) {
        return res.status(400).json({
          errors: [
            {
              message: err.message,
              errorType: 'clientError',
            },
          ],
        });
      }
    },
  );

  app.delete(URI, auth, async (req, res) => {
    try {
      const deletedUser = await User.findByIdAndRemove(req.user._id);
      return res.send(deletedUser);
    } catch (err) {
      return res.status(400).json({
        errors: [
          {
            message: err.message,
            errorType: 'clientError',
          },
        ],
      });
    }
  });
};
