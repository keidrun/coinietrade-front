const { BackendApiClient } = require('../utils/clients');

class PolicyController {
  constructor() {
    this.apiClient = new BackendApiClient();

    this.find = this.find.bind(this);
  }

  async find(req, res) {
    try {
      const userId = req.user._id;
      const response = await this.apiClient.getPolicy(userId);
      return res.json(response.data);
    } catch (error) {
      return res.status(400).json({
        errors: [
          {
            message: error.message,
            errorType: 'clientError',
          },
        ],
      });
    }
  }
}

module.exports = PolicyController;
