const _ = require('lodash');
const { User } = require('../../models/User');
const auth = require('../../middleware/auth');
const handleValidationErrors = require('../../middleware/handleValidationErrors');
const { updateUserValidator } = require('../../validators');
const { BackendApiClient } = require('../../utils/BackendApiClient');

const RESOURCE_NAME = 'user';
const VERSION = 'v1';
const URI = `/api/${VERSION}/${RESOURCE_NAME}`;
const apiClient = new BackendApiClient();

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
      const userId = req.user._id;
      const user = req.body;

      if (user.secrets) {
        try {
          const presentUserModel = await User.findById(userId);
          const presentSecretsModel = presentUserModel.secrets;

          // Add secrets to backend
          const addSecretPromises = user.secrets
            .filter(
              secret => secret.apiProvider && secret.apiKey && secret.apiSecret,
            )
            .map(async ({ apiProvider, apiKey, apiSecret }) => {
              try {
                const response = await apiClient.addSecret({
                  userId,
                  apiProvider,
                  apiKey,
                  apiSecret,
                });
                return {
                  _id: response.data.secretId,
                  apiProvider,
                  apiKeyTail: `xxxxxx${apiKey.slice(-4)}`,
                  apiSecretTail: `xxxxxx${apiSecret.slice(-4)}`,
                };
              } catch (error) {
                throw error;
              }
            });
          const addedSecrets = await Promise.all(addSecretPromises);
          const addedSecretsMap = _.mapKeys(addedSecrets, 'apiProvider');

          // Remove secrets from backend
          const removeSecretPromises = presentSecretsModel
            .filter(secret => addedSecretsMap[secret.apiProvider])
            .map(async ({ _id, apiProvider, apiKeyTail, apiSecretTail }) => {
              try {
                await apiClient.removeSecret(userId, _id);
                return {
                  _id,
                  apiProvider,
                  apiKeyTail,
                  apiSecretTail,
                };
              } catch (error) {
                throw error;
              }
            });
          const removedSecrets = await Promise.all(removeSecretPromises);
          const removedSecretsMap = _.mapKeys(removedSecrets, 'apiProvider');

          const newSecretsModel = presentSecretsModel
            .filter(secret => !removedSecretsMap[secret.apiProvider])
            .concat(addedSecrets);

          user.secrets = newSecretsModel;
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
      }

      try {
        const updatedUser = await User.findByIdAndUpdate(userId, user, {
          new: true,
          runValidators: true,
        });
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
