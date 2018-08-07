const axios = require('axios');
const moment = require('moment');
const keys = require('../../config/keys').get(process.env.NODE_ENV);

const API_VERSION = 'v1';
const API_BASE_URL = `${keys.endpointApiURL}/${API_VERSION}`;
const DEFAULT_API_TIMEOUT_MILLIS = 1000;
const DEFAULT_RULE_LIMIT = 3;
const DEFAULT_RULE_EXPIRED_DATE = moment()
  .add(6, 'months')
  .toISOString();

class BackendApiClient {
  constructor(timeout = DEFAULT_API_TIMEOUT_MILLIS) {
    this.client = axios.create({
      baseURL: API_BASE_URL,
      timeout,
      headers: { 'x-api-key': keys.endpointApiKey },
    });
  }

  setAdapter(adapter) {
    this.client.defaults.adapter = adapter;
  }

  // Policies API
  async getPolicies() {
    try {
      const response = await this.client.get(`/policies`);
      return response;
    } catch (error) {
      throw error;
    }
  }

  async getPolicy(userId) {
    try {
      const response = await this.client.get(`/policies/${userId}`);
      return response;
    } catch (error) {
      throw error;
    }
  }

  async addPolicy(data) {
    const json = data;
    if (!json.ruleLimit) json.ruleLimit = DEFAULT_RULE_LIMIT;
    if (!json.expiredAt) json.expiredAt = DEFAULT_RULE_EXPIRED_DATE;

    try {
      const response = await this.client.post('/policies', json);
      return response;
    } catch (error) {
      throw error;
    }
  }

  async removePolicy(userId) {
    try {
      const response = await this.client.delete(`/policies/${userId}`);
      return response;
    } catch (error) {
      throw error;
    }
  }

  async updatePolicy(userId, data) {
    try {
      const response = await this.client.patch(`/policies/${userId}`, data);
      return response;
    } catch (error) {
      throw error;
    }
  }

  // Properties API
  async getExchanges() {
    try {
      const response = await this.client.get('/exchanges');
      return response;
    } catch (error) {
      throw error;
    }
  }

  // Rules API
  async getRules() {
    try {
      const response = await this.client.get('/rules');
      return response;
    } catch (error) {
      throw error;
    }
  }

  async getRulesByUserId(userId) {
    try {
      const response = await this.client.get(`/rules/${userId}`);
      return response;
    } catch (error) {
      throw error;
    }
  }

  async addRule(data) {
    try {
      const response = await this.client.post('/rules', data);
      return response;
    } catch (error) {
      throw error;
    }
  }

  async updateRule(userId, ruleId, data) {
    try {
      const response = await this.client.patch(
        `/rules/${userId}/${ruleId}`,
        data,
      );
      return response;
    } catch (error) {
      throw error;
    }
  }

  async removeRule(userId, ruleId) {
    try {
      const response = await this.client.delete(`/rules/${userId}/${ruleId}`);
      return response;
    } catch (error) {
      throw error;
    }
  }

  // Secrets API
  async addSecret(data) {
    try {
      const response = await this.client.post('/secrets', data);
      return response;
    } catch (error) {
      throw error;
    }
  }

  async removeSecret(userId, secretId) {
    try {
      const response = await this.client.delete(
        `/secrets/${userId}/${secretId}`,
      );
      return response;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = BackendApiClient;
