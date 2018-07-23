const path = require('path');
const nock = require('nock');
const keys = require('../../config/keys').get(process.env.NODE_ENV);
const { BackendApiClient } = require('../../src/utils/BackendApiClient');

// eslint-disable-next-line import/no-dynamic-require
const http = require(path.join(
  path.dirname(require.resolve('axios')),
  'lib/adapters/http',
));
const TEST_API_VERSION = 'v1';
const TEST_API_BASE_URL = `${keys.endpointApiURL}/${TEST_API_VERSION}`;

describe('BackendApiClient', () => {
  describe('getPolicies function', () => {
    test('should fetch policies data', async () => {
      nock(TEST_API_BASE_URL)
        .get('/policies')
        .reply(200, [
          {
            userId: '773d0f18-c96d-469f-882c-b7c027b04b93',
            ruleLimit: 1,
            expiredAt: '2019-01-19T23:09:09.645Z',
            effect: 'allow',
            grade: 0,
            version: 0,
            createdAt: '2018-07-19T22:09:27.093Z',
            updatedAt: '2018-07-19T22:09:27.093Z',
          },
          {
            userId: 'd9e5bb14-6582-4171-bd84-f4325514558b',
            ruleLimit: 3,
            expiredAt: '2019-01-22T23:09:19.645Z',
            effect: 'allow',
            grade: 1,
            version: 2,
            createdAt: '2018-07-22T22:09:37.093Z',
            updatedAt: '2018-07-22T22:09:37.093Z',
          },
        ]);
      const apiClient = new BackendApiClient();
      apiClient.setAdapter(http);

      const response = await apiClient.getPolicies();

      expect(response.data).toEqual([
        {
          userId: '773d0f18-c96d-469f-882c-b7c027b04b93',
          ruleLimit: 1,
          expiredAt: '2019-01-19T23:09:09.645Z',
          effect: 'allow',
          grade: 0,
          version: 0,
          createdAt: '2018-07-19T22:09:27.093Z',
          updatedAt: '2018-07-19T22:09:27.093Z',
        },
        {
          userId: 'd9e5bb14-6582-4171-bd84-f4325514558b',
          ruleLimit: 3,
          expiredAt: '2019-01-22T23:09:19.645Z',
          effect: 'allow',
          grade: 1,
          version: 2,
          createdAt: '2018-07-22T22:09:37.093Z',
          updatedAt: '2018-07-22T22:09:37.093Z',
        },
      ]);
    });
    test('should fetch empty policies data', async () => {
      nock(TEST_API_BASE_URL)
        .get('/policies')
        .reply(200, []);
      const apiClient = new BackendApiClient();
      apiClient.setAdapter(http);

      const response = await apiClient.getPolicies();

      expect(response.data).toEqual([]);
    });
  });

  describe('getPolicy function', () => {
    test('should fetch one policy with the user', async () => {
      const userId = '773d0f18-c96d-469f-882c-b7c027b04b93';
      nock(TEST_API_BASE_URL)
        .get(`/policies/${userId}`)
        .reply(200, {
          userId: '773d0f18-c96d-469f-882c-b7c027b04b93',
          ruleLimit: 1,
          expiredAt: '2019-01-19T23:09:09.645Z',
          effect: 'allow',
          grade: 0,
          version: 0,
          createdAt: '2018-07-19T22:09:27.093Z',
          updatedAt: '2018-07-19T22:09:27.093Z',
        });
      const apiClient = new BackendApiClient();
      apiClient.setAdapter(http);

      const response = await apiClient.getPolicy(userId);

      expect(response.data).toEqual({
        userId: '773d0f18-c96d-469f-882c-b7c027b04b93',
        ruleLimit: 1,
        expiredAt: '2019-01-19T23:09:09.645Z',
        effect: 'allow',
        grade: 0,
        version: 0,
        createdAt: '2018-07-19T22:09:27.093Z',
        updatedAt: '2018-07-19T22:09:27.093Z',
      });
    });

    test('should throw error because of the user missing', async () => {
      const userId = 'none';
      nock(TEST_API_BASE_URL)
        .get(`/policies/${userId}`)
        .reply(404, {
          message: 'Read Policy Request Failed',
          time: '2018-07-23T04:39:25.620Z',
          method: 'GET',
          endpoint: '/v1/policies/none',
          errors: [
            {
              code: 7102,
              message: "Policy data with the provided 'id' NOT found",
            },
          ],
        });
      const apiClient = new BackendApiClient();
      apiClient.setAdapter(http);

      try {
        await apiClient.getPolicy(userId);
      } catch (error) {
        expect(error.response.status).toEqual(404);
      }
    });
  });

  describe('addPolicy function', () => {
    test('should fetch added policy with the user', async () => {
      nock(TEST_API_BASE_URL)
        .post(`/policies`)
        .reply(201, {
          userId: 'c1c5ea67-2e42-4720-8769-ced29819957c',
          ruleLimit: 5,
          expiredAt: '2019-01-19T23:09:09.645Z',
          effect: 'allow',
          grade: 0,
          version: 0,
          createdAt: '2018-07-19T22:09:27.093Z',
          updatedAt: '2018-07-19T22:09:27.093Z',
        });
      const apiClient = new BackendApiClient();
      apiClient.setAdapter(http);

      const response = await apiClient.addPolicy({
        userId: 'c1c5ea67-2e42-4720-8769-ced29819957c',
        ruleLimit: 5,
        expiredAt: '2019-01-19T23:09:09.645Z',
      });

      expect(response.status).toBe(201);
      expect(response.data).toEqual({
        userId: 'c1c5ea67-2e42-4720-8769-ced29819957c',
        ruleLimit: 5,
        expiredAt: '2019-01-19T23:09:09.645Z',
        effect: 'allow',
        grade: 0,
        version: 0,
        createdAt: '2018-07-19T22:09:27.093Z',
        updatedAt: '2018-07-19T22:09:27.093Z',
      });
    });
  });

  describe('removePolicy function', () => {
    test('should fetch 204 status', async () => {
      const userId = 'c1c5ea67-2e42-4720-8769-ced29819957c';
      nock(TEST_API_BASE_URL)
        .delete(`/policies/${userId}`)
        .reply(204);
      const apiClient = new BackendApiClient();
      apiClient.setAdapter(http);

      const response = await apiClient.removePolicy(userId);

      expect(response.status).toBe(204);
    });

    test('should throw error because of the user missing', async () => {
      const userId = 'none';
      nock(TEST_API_BASE_URL)
        .delete(`/policies/${userId}`)
        .reply(404, {
          message: 'Delete Policy Request Failed',
          time: '2018-07-23T05:26:23.287Z',
          method: 'DELETE',
          endpoint: '/v1/policies/none',
          errors: [
            {
              code: 7103,
              message: "Policy data with the provided 'userId' NOT found",
            },
          ],
        });
      const apiClient = new BackendApiClient();
      apiClient.setAdapter(http);

      try {
        await apiClient.removePolicy(userId);
      } catch (error) {
        expect(error.response.status).toEqual(404);
      }
    });
  });

  describe('updatePolicy function', () => {
    test('should fetch updated policy with the user', async () => {
      const userId = 'c1c5ea67-2e42-4720-8769-ced29819957c';
      nock(TEST_API_BASE_URL)
        .patch(`/policies/${userId}`)
        .reply(200, {
          userId: 'c1c5ea67-2e42-4720-8769-ced29819957c',
          ruleLimit: 10,
          expiredAt: '2020-01-19T23:09:09.645Z',
          effect: 'allow',
          grade: 2,
          version: 1,
          createdAt: '2018-07-19T22:09:27.093Z',
          updatedAt: '2018-07-19T22:09:27.093Z',
        });
      const apiClient = new BackendApiClient();
      apiClient.setAdapter(http);

      const response = await apiClient.updatePolicy(
        'c1c5ea67-2e42-4720-8769-ced29819957c',
        {
          grade: 2,
          ruleLimit: 10,
          expiredAt: '2020-01-19T23:09:09.645Z',
        },
      );

      expect(response.status).toBe(200);
      expect(response.data).toEqual({
        userId: 'c1c5ea67-2e42-4720-8769-ced29819957c',
        ruleLimit: 10,
        expiredAt: '2020-01-19T23:09:09.645Z',
        effect: 'allow',
        grade: 2,
        version: 1,
        createdAt: '2018-07-19T22:09:27.093Z',
        updatedAt: '2018-07-19T22:09:27.093Z',
      });
    });

    test('should throw error because of the user missing', async () => {
      const userId = 'none';
      nock(TEST_API_BASE_URL)
        .patch(`/policies/${userId}`)
        .reply(404, {
          message: 'Update Policy Request Failed',
          time: '2018-07-23T05:47:15.027Z',
          method: 'PATCH',
          endpoint: '/v1/policies/c1c5ea67-2e42-4720-8769-ced29819957c',
          errors: [
            {
              code: 7104,
              message: "Policy data with the provided 'id' NOT found",
            },
          ],
        });
      const apiClient = new BackendApiClient();
      apiClient.setAdapter(http);

      try {
        await apiClient.updatePolicy(userId);
      } catch (error) {
        expect(error.response.status).toEqual(404);
      }
    });
  });
});
