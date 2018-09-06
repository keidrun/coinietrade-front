const path = require('path');
const nock = require('nock');
const keys = require('../../../../config/keys').get(process.env.NODE_ENV);
const { BackendApiClient } = require('../../../../src/utils/clients');

// eslint-disable-next-line import/no-dynamic-require
const http = require(path.join(
  path.dirname(require.resolve('axios')),
  'lib/adapters/http',
));
const TEST_API_VERSION = 'v1';
const TEST_API_BASE_URL = `${keys.endpointApiURL}/${TEST_API_VERSION}`;

describe('BackendApiClient', () => {
  const apiClient = new BackendApiClient();
  apiClient.setAdapter(http);

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

      const response = await apiClient.removePolicy(userId);

      expect(response.status).toBe(204);
      expect(response.data).toBeFalsy();
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

      try {
        await apiClient.updatePolicy(userId);
      } catch (error) {
        expect(error.response.status).toEqual(404);
      }
    });
  });

  describe('getExchanges function', () => {
    test('should fetch polices data', async () => {
      nock(TEST_API_BASE_URL)
        .get('/exchanges')
        .reply(200, {
          bitflyer: [
            {
              coinUnit: 'btc',
              currencyUnit: 'jpy',
            },
          ],
          zaif: [
            {
              coinUnit: 'btc',
              currencyUnit: 'jpy',
            },
          ],
        });

      const response = await apiClient.getExchanges();

      expect(response.status).toBe(200);
      expect(response.data).toEqual({
        bitflyer: [
          {
            coinUnit: 'btc',
            currencyUnit: 'jpy',
          },
        ],
        zaif: [
          {
            coinUnit: 'btc',
            currencyUnit: 'jpy',
          },
        ],
      });
    });
  });

  describe('getRules function', () => {
    test('should fetch all rules data', async () => {
      nock(TEST_API_BASE_URL)
        .get('/rules')
        .reply(200, [
          {
            orderType: 'limit_order',
            otherSiteName: 'zaif',
            totalProfit: 0,
            counts: {
              executionCount: 0,
              successCount: 0,
              failureCount: 0,
              cancellationCount: 0,
            },
            modifiedAt: '2018-07-26T03:48:00.075Z',
            priority: 1,
            userId: 'f1f5ea67-2e42-4720-8769-ced29819957f',
            version: 8,
            assetMinLimit: 2000,
            createdAt: '2018-07-26T03:41:50.346Z',
            oneSiteName: 'bitflyer',
            buyWeightRate: 1.001,
            maxFailedLimit: 999,
            assetRange: 0.1,
            ruleId: '2d95c895-fe47-4f84-8680-7d651f7d2701',
            strategy: 'simple_arbitrage',
            coinUnit: 'btc',
            currencyUnit: 'jpy',
            sellWeightRate: 0.999,
            status: 'available',
            updatedAt: '2018-07-26T03:48:00.091Z',
          },
          {
            orderType: 'limit_order',
            otherSiteName: 'zaif',
            totalProfit: 0,
            counts: {
              executionCount: 0,
              successCount: 0,
              failureCount: 0,
              cancellationCount: 0,
            },
            modifiedAt: '2018-07-26T03:49:35.672Z',
            priority: 2,
            userId: 'g1g5ea67-2e42-4720-8769-ced29819957g',
            version: 0,
            assetMinLimit: 1500,
            createdAt: '2018-07-26T03:49:35.672Z',
            oneSiteName: 'bitflyer',
            buyWeightRate: 1,
            maxFailedLimit: 1000,
            ruleId: '0ff1dbd2-7cc4-4781-830c-01d0bc5fed3f',
            strategy: 'simple_arbitrage',
            assetRange: 0.2,
            coinUnit: 'btc',
            currencyUnit: 'jpy',
            sellWeightRate: 1,
            status: 'available',
            updatedAt: '2018-07-26T03:49:35.672Z',
          },
        ]);

      const response = await apiClient.getRules();

      expect(response.status).toBe(200);
      expect(response.data).toEqual([
        {
          orderType: 'limit_order',
          otherSiteName: 'zaif',
          totalProfit: 0,
          counts: {
            executionCount: 0,
            successCount: 0,
            failureCount: 0,
            cancellationCount: 0,
          },
          modifiedAt: '2018-07-26T03:48:00.075Z',
          priority: 1,
          userId: 'f1f5ea67-2e42-4720-8769-ced29819957f',
          version: 8,
          assetMinLimit: 2000,
          createdAt: '2018-07-26T03:41:50.346Z',
          oneSiteName: 'bitflyer',
          buyWeightRate: 1.001,
          maxFailedLimit: 999,
          assetRange: 0.1,
          ruleId: '2d95c895-fe47-4f84-8680-7d651f7d2701',
          strategy: 'simple_arbitrage',
          coinUnit: 'btc',
          currencyUnit: 'jpy',
          sellWeightRate: 0.999,
          status: 'available',
          updatedAt: '2018-07-26T03:48:00.091Z',
        },
        {
          orderType: 'limit_order',
          otherSiteName: 'zaif',
          totalProfit: 0,
          counts: {
            executionCount: 0,
            successCount: 0,
            failureCount: 0,
            cancellationCount: 0,
          },
          modifiedAt: '2018-07-26T03:49:35.672Z',
          priority: 2,
          userId: 'g1g5ea67-2e42-4720-8769-ced29819957g',
          version: 0,
          assetMinLimit: 1500,
          createdAt: '2018-07-26T03:49:35.672Z',
          oneSiteName: 'bitflyer',
          buyWeightRate: 1,
          maxFailedLimit: 1000,
          ruleId: '0ff1dbd2-7cc4-4781-830c-01d0bc5fed3f',
          strategy: 'simple_arbitrage',
          assetRange: 0.2,
          coinUnit: 'btc',
          currencyUnit: 'jpy',
          sellWeightRate: 1,
          status: 'available',
          updatedAt: '2018-07-26T03:49:35.672Z',
        },
      ]);
    });

    test('should fetch empty rules data', async () => {
      nock(TEST_API_BASE_URL)
        .get('/rules')
        .reply(200, []);

      const response = await apiClient.getRules();

      expect(response.status).toBe(200);
      expect(response.data).toEqual([]);
    });
  });

  describe('getRulesByUserId function', () => {
    test('should fetch one rules data with the userId', async () => {
      const userId = 'g1g5ea67-2e42-4720-8769-ced29819957g';
      nock(TEST_API_BASE_URL)
        .get(`/rules/${userId}`)
        .reply(200, [
          {
            orderType: 'limit_order',
            otherSiteName: 'zaif',
            totalProfit: 0,
            counts: {
              executionCount: 0,
              successCount: 0,
              failureCount: 0,
              cancellationCount: 0,
            },
            modifiedAt: '2018-07-26T03:52:00.098Z',
            priority: 2,
            userId: 'g1g5ea67-2e42-4720-8769-ced29819957g',
            version: 4,
            assetMinLimit: 1500,
            createdAt: '2018-07-26T03:49:35.672Z',
            oneSiteName: 'bitflyer',
            buyWeightRate: 1,
            maxFailedLimit: 1000,
            assetRange: 0.2,
            ruleId: '0ff1dbd2-7cc4-4781-830c-01d0bc5fed3f',
            strategy: 'simple_arbitrage',
            coinUnit: 'btc',
            currencyUnit: 'jpy',
            sellWeightRate: 1,
            status: 'available',
            updatedAt: '2018-07-26T03:52:00.128Z',
          },
        ]);

      const response = await apiClient.getRulesByUserId(userId);

      expect(response.status).toBe(200);
      expect(response.data).toEqual([
        {
          orderType: 'limit_order',
          otherSiteName: 'zaif',
          totalProfit: 0,
          counts: {
            executionCount: 0,
            successCount: 0,
            failureCount: 0,
            cancellationCount: 0,
          },
          modifiedAt: '2018-07-26T03:52:00.098Z',
          priority: 2,
          userId: 'g1g5ea67-2e42-4720-8769-ced29819957g',
          version: 4,
          assetMinLimit: 1500,
          createdAt: '2018-07-26T03:49:35.672Z',
          oneSiteName: 'bitflyer',
          buyWeightRate: 1,
          maxFailedLimit: 1000,
          assetRange: 0.2,
          ruleId: '0ff1dbd2-7cc4-4781-830c-01d0bc5fed3f',
          strategy: 'simple_arbitrage',
          coinUnit: 'btc',
          currencyUnit: 'jpy',
          sellWeightRate: 1,
          status: 'available',
          updatedAt: '2018-07-26T03:52:00.128Z',
        },
      ]);
    });
  });

  describe('getRule function', () => {
    test('should fetch a rule', async () => {
      const userId = 'b7cecc1e-cc05-4315-8bdf-d92c1c88b991';
      const ruleId = 'dcfb5c61-ac9c-42e3-a9be-bd770de1ba03';
      nock(TEST_API_BASE_URL)
        .get(`/rules/${userId}/${ruleId}`)
        .reply(200, {
          orderType: 'limit_order',
          otherSiteName: 'zaif',
          totalProfit: 0,
          counts: {
            executionCount: 0,
            successCount: 0,
            failureCount: 0,
            cancellationCount: 0,
          },
          modifiedAt: '2018-08-14T07:40:00.111Z',
          priority: 0,
          userId: 'b7cecc1e-cc05-4315-8bdf-d92c1c88b991',
          version: 2,
          assetMinLimit: 2000,
          createdAt: '2018-08-14T07:39:04.044Z',
          oneSiteName: 'bitflyer',
          buyWeightRate: 1.001,
          maxFailedLimit: 999,
          assetRange: 0.1,
          ruleId: 'dcfb5c61-ac9c-42e3-a9be-bd770de1ba03',
          strategy: 'simple_arbitrage',
          coinUnit: 'btc',
          currencyUnit: 'jpy',
          sellWeightRate: 0.999,
          status: 'available',
          updatedAt: '2018-08-14T07:40:00.133Z',
        });

      const response = await apiClient.getRule(userId, ruleId);

      expect(response.status).toBe(200);
      expect(response.data).toEqual({
        orderType: 'limit_order',
        otherSiteName: 'zaif',
        totalProfit: 0,
        counts: {
          executionCount: 0,
          successCount: 0,
          failureCount: 0,
          cancellationCount: 0,
        },
        modifiedAt: '2018-08-14T07:40:00.111Z',
        priority: 0,
        userId: 'b7cecc1e-cc05-4315-8bdf-d92c1c88b991',
        version: 2,
        assetMinLimit: 2000,
        createdAt: '2018-08-14T07:39:04.044Z',
        oneSiteName: 'bitflyer',
        buyWeightRate: 1.001,
        maxFailedLimit: 999,
        assetRange: 0.1,
        ruleId: 'dcfb5c61-ac9c-42e3-a9be-bd770de1ba03',
        strategy: 'simple_arbitrage',
        coinUnit: 'btc',
        currencyUnit: 'jpy',
        sellWeightRate: 0.999,
        status: 'available',
        updatedAt: '2018-08-14T07:40:00.133Z',
      });
    });
  });

  describe('addRule function', () => {
    test('should fetch added rule data', async () => {
      nock(TEST_API_BASE_URL)
        .post('/rules')
        .reply(201, {
          userId: 'f1f5ea67-2e42-4720-8769-ced29819957f',
          strategy: 'simple_arbitrage',
          coinUnit: 'btc',
          currencyUnit: 'jpy',
          oneSiteName: 'bitflyer',
          otherSiteName: 'zaif',
          counts: {
            executionCount: 0,
            successCount: 0,
            failureCount: 0,
            cancellationCount: 0,
          },
          priority: 1,
          orderType: 'limit_order',
          assetRange: 0.1,
          assetMinLimit: 2000,
          buyWeightRate: 1.001,
          sellWeightRate: 0.999,
          maxFailedLimit: 999,
          ruleId: '2d95c895-fe47-4f84-8680-7d651f7d2701',
          totalProfit: 0,
          status: 'available',
          modifiedAt: '2018-07-26T03:41:50.346Z',
          version: 0,
          createdAt: '2018-07-26T03:41:50.346Z',
          updatedAt: '2018-07-26T03:41:50.346Z',
        });

      const response = await apiClient.addRule({
        userId: 'f1f5ea67-2e42-4720-8769-ced29819957f',
        strategy: 'simple_arbitrage',
        coinUnit: 'btc',
        currencyUnit: 'jpy',
        oneSiteName: 'bitflyer',
        otherSiteName: 'zaif',
        priority: 1,
        orderType: 'limit_order',
        assetRange: 0.1,
        assetMinLimit: 2000,
        buyWeightRate: 1.001,
        sellWeightRate: 0.999,
        maxFailedLimit: 999,
      });

      expect(response.status).toBe(201);
      expect(response.data).toEqual({
        userId: 'f1f5ea67-2e42-4720-8769-ced29819957f',
        strategy: 'simple_arbitrage',
        coinUnit: 'btc',
        currencyUnit: 'jpy',
        oneSiteName: 'bitflyer',
        otherSiteName: 'zaif',
        counts: {
          executionCount: 0,
          successCount: 0,
          failureCount: 0,
          cancellationCount: 0,
        },
        priority: 1,
        orderType: 'limit_order',
        assetRange: 0.1,
        assetMinLimit: 2000,
        buyWeightRate: 1.001,
        sellWeightRate: 0.999,
        maxFailedLimit: 999,
        ruleId: '2d95c895-fe47-4f84-8680-7d651f7d2701',
        totalProfit: 0,
        status: 'available',
        modifiedAt: '2018-07-26T03:41:50.346Z',
        version: 0,
        createdAt: '2018-07-26T03:41:50.346Z',
        updatedAt: '2018-07-26T03:41:50.346Z',
      });
    });
  });

  describe('updateRule function', () => {
    test('should fetch updated rule data', async () => {
      const userId = '91c2a74a-4cab-4457-9eaf-74be4e99e289';
      const ruleId = '0da72fac-bf71-4b8d-af2f-ee354ba31016';
      nock(TEST_API_BASE_URL)
        .patch(`/rules/${userId}/${ruleId}`)
        .reply(200, {
          userId,
          strategy: 'simple_arbitrage',
          coinUnit: 'btc',
          currencyUnit: 'jpy',
          oneSiteName: 'zaif',
          otherSiteName: 'bitflyer',
          counts: {
            executionCount: 0,
            successCount: 0,
            failureCount: 0,
            cancellationCount: 0,
          },
          priority: 7,
          orderType: 'limit_order',
          assetRange: 0.1,
          assetMinLimit: 2000,
          buyWeightRate: 1.001,
          sellWeightRate: 0.999,
          maxFailedLimit: 999,
          ruleId,
          totalProfit: 0,
          status: 'unavailable',
          modifiedAt: '2018-07-26T03:41:50.346Z',
          version: 1,
          createdAt: '2018-07-26T03:41:50.346Z',
          updatedAt: '2018-07-26T03:41:50.346Z',
        });

      const response = await apiClient.updateRule(userId, ruleId, {
        strategy: 'simple_arbitrage',
        coinUnit: 'btc',
        currencyUnit: 'jpy',
        oneSiteName: 'zaif',
        otherSiteName: 'bitflyer',
        priority: 7,
        orderType: 'limit_order',
        assetRange: 0.1,
        assetMinLimit: 2000,
        buyWeightRate: 1.001,
        sellWeightRate: 0.999,
        maxFailedLimit: 999,
        status: 'unavailable',
      });

      expect(response.status).toBe(200);
      expect(response.data).toEqual({
        userId,
        strategy: 'simple_arbitrage',
        coinUnit: 'btc',
        currencyUnit: 'jpy',
        oneSiteName: 'zaif',
        otherSiteName: 'bitflyer',
        counts: {
          executionCount: 0,
          successCount: 0,
          failureCount: 0,
          cancellationCount: 0,
        },
        priority: 7,
        orderType: 'limit_order',
        assetRange: 0.1,
        assetMinLimit: 2000,
        buyWeightRate: 1.001,
        sellWeightRate: 0.999,
        maxFailedLimit: 999,
        ruleId,
        totalProfit: 0,
        status: 'unavailable',
        modifiedAt: '2018-07-26T03:41:50.346Z',
        version: 1,
        createdAt: '2018-07-26T03:41:50.346Z',
        updatedAt: '2018-07-26T03:41:50.346Z',
      });
    });

    test('should update only status', async () => {
      const userId = '91c2a74a-4cab-4457-9eaf-74be4e99e289';
      const ruleId = '0da72fac-bf71-4b8d-af2f-ee354ba31016';
      nock(TEST_API_BASE_URL)
        .patch(`/rules/${userId}/${ruleId}`)
        .reply(200, {
          userId,
          strategy: 'simple_arbitrage',
          coinUnit: 'btc',
          currencyUnit: 'jpy',
          oneSiteName: 'zaif',
          otherSiteName: 'bitflyer',
          counts: {
            executionCount: 0,
            successCount: 0,
            failureCount: 0,
            cancellationCount: 0,
          },
          priority: 7,
          orderType: 'limit_order',
          assetRange: 0.1,
          assetMinLimit: 2000,
          buyWeightRate: 1.001,
          sellWeightRate: 0.999,
          maxFailedLimit: 999,
          ruleId,
          totalProfit: 0,
          status: 'unavailable',
          modifiedAt: '2018-07-26T03:41:50.346Z',
          version: 1,
          createdAt: '2018-07-26T03:41:50.346Z',
          updatedAt: '2018-07-26T03:41:50.346Z',
        });

      const response = await apiClient.updateRule(userId, ruleId, {
        status: 'unavailable',
      });

      expect(response.status).toBe(200);
      expect(response.data).toEqual({
        userId,
        strategy: 'simple_arbitrage',
        coinUnit: 'btc',
        currencyUnit: 'jpy',
        oneSiteName: 'zaif',
        otherSiteName: 'bitflyer',
        counts: {
          executionCount: 0,
          successCount: 0,
          failureCount: 0,
          cancellationCount: 0,
        },
        priority: 7,
        orderType: 'limit_order',
        assetRange: 0.1,
        assetMinLimit: 2000,
        buyWeightRate: 1.001,
        sellWeightRate: 0.999,
        maxFailedLimit: 999,
        ruleId,
        totalProfit: 0,
        status: 'unavailable',
        modifiedAt: '2018-07-26T03:41:50.346Z',
        version: 1,
        createdAt: '2018-07-26T03:41:50.346Z',
        updatedAt: '2018-07-26T03:41:50.346Z',
      });
    });
  });

  describe('removeRule function', () => {
    test('should fetch 204 status', async () => {
      const userId = 'g1g5ea67-2e42-4720-8769-ced29819957g';
      const ruleId = '0ff1dbd2-7cc4-4781-830c-01d0bc5fed3f';
      nock(TEST_API_BASE_URL)
        .delete(`/rules/${userId}/${ruleId}`)
        .reply(204);

      const response = await apiClient.removeRule(userId, ruleId);

      expect(response.status).toBe(204);
      expect(response.data).toBeFalsy();
    });
  });

  describe('addSecret function', () => {
    test('should fetch added secret data', async () => {
      nock(TEST_API_BASE_URL)
        .post('/secrets')
        .reply(201, {
          userId: '5ss1dbd2-7cc4-4781-830c-01d0bc5fed3s',
          secretId: '3173dc2a-8c81-4b44-b54e-262aed659a63',
          apiProvider: 'bitflyer',
          createdAt: '2018-07-26T04:29:17.933Z',
          updatedAt: '2018-07-26T04:29:17.933Z',
        });

      const response = await apiClient.addSecret({
        userId: '5ss1dbd2-7cc4-4781-830c-01d0bc5fed3s',
        apiProvider: 'bitflyer',
        apiKey: 'ANY_API_KEY',
        apiSecret: 'ANY_API_SECRET',
      });

      expect(response.status).toBe(201);
      expect(response.data).toEqual({
        userId: '5ss1dbd2-7cc4-4781-830c-01d0bc5fed3s',
        secretId: '3173dc2a-8c81-4b44-b54e-262aed659a63',
        apiProvider: 'bitflyer',
        createdAt: '2018-07-26T04:29:17.933Z',
        updatedAt: '2018-07-26T04:29:17.933Z',
      });
    });
  });

  describe('removeSecret function', () => {
    test('should fetch 204 status', async () => {
      const userId = '5ss1dbd2-7cc4-4781-830c-01d0bc5fed3s';
      const secretId = '3173dc2a-8c81-4b44-b54e-262aed659a63';
      nock(TEST_API_BASE_URL)
        .delete(`/secrets/${userId}/${secretId}`)
        .reply(204);

      const response = await apiClient.removeSecret(userId, secretId);

      expect(response.status).toBe(204);
      expect(response.data).toBeFalsy();
    });
  });
});
