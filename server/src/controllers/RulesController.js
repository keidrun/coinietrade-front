const { BackendApiClient } = require('../utils/clients');

class RulesController {
  constructor() {
    this.apiClient = new BackendApiClient();

    this.findAll = this.findAll.bind(this);
    this.findOne = this.findOne.bind(this);
    this.add = this.add.bind(this);
    this.update = this.update.bind(this);
    this.remove = this.remove.bind(this);
  }

  async findAll(req, res) {
    try {
      const userId = req.user._id;
      const response = await this.apiClient.getRulesByUserId(userId);
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

  async findOne(req, res) {
    try {
      const userId = req.user._id;
      const { ruleId } = req.params;
      const response = await this.apiClient.getRule(userId, ruleId);
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

  async add(req, res) {
    try {
      const userId = req.user._id;
      const newRule = req.body;
      newRule.userId = userId;
      const response = await this.apiClient.addRule(newRule);
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

  async update(req, res) {
    try {
      const userId = req.user._id;
      const { ruleId } = req.params;
      const patchRule = req.body;
      const response = await this.apiClient.updateRule(
        userId,
        ruleId,
        patchRule,
      );
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

  async remove(req, res) {
    try {
      const userId = req.user._id;
      const { ruleId } = req.params;
      await this.apiClient.removeRule(userId, ruleId);
      return res.status(204).json();
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

module.exports = RulesController;
