const { validationErrorsResult } = require('../../../helpers/utils');
const {
  updateRuleValidator,
} = require('../../../../src/middleware/validators');
const {
  STRATEGIES,
  ORDER_TYPES,
  COIN_UNITS,
  CURRENCY_UNITS,
  EXCHANGE_SITES,
  RULE_STATUS,
} = require('../../../../src/middleware/validators/constants');

describe('updateRuleValidator test', () => {
  test('should call next if the rule with all fields is verified', async () => {
    const req = {
      body: {
        strategy: STRATEGIES.SIMPLE_ARBITRAGE,
        coinUnit: COIN_UNITS.BTC,
        currencyUnit: CURRENCY_UNITS.JPY,
        orderType: ORDER_TYPES.LIMIT_ORDER,
        assetRange: 0.8,
        assetMinLimit: 1000,
        buyWeightRate: 0.0001,
        sellWeightRate: 0.0001,
        maxFailedLimit: 100,
        oneSiteName: EXCHANGE_SITES.BITFLYER,
        otherSiteName: EXCHANGE_SITES.ZAIF,
        status: RULE_STATUS.AVAILABLE,
      },
      query: {},
      headers: {},
    };
    const res = {};
    const next = jest.fn();

    const {
      validationErrors,
      middlewareCalledTimes,
    } = await validationErrorsResult(updateRuleValidator)(req, res, next);

    expect(next).toHaveBeenCalledTimes(middlewareCalledTimes);
    expect(validationErrors.isEmpty()).toBe(true);
  });

  test('should have errors about essential fields if the rule does NOT exist', async () => {
    const req = {
      body: {},
      query: {},
      headers: {},
    };
    const res = {};
    const next = jest.fn();

    const {
      validationErrors,
      middlewareCalledTimes,
    } = await validationErrorsResult(updateRuleValidator)(req, res, next);

    expect(next).toHaveBeenCalledTimes(middlewareCalledTimes);
    expect(validationErrors.isEmpty()).toBe(true);
  });

  test('should have an error about wrong strategy if the strategy is wrong value', async () => {
    const req = {
      body: {
        strategy: 'none',
        coinUnit: COIN_UNITS.BTC,
        currencyUnit: CURRENCY_UNITS.JPY,
        orderType: ORDER_TYPES.LIMIT_ORDER,
        assetRange: 0.8,
        assetMinLimit: 1000,
        buyWeightRate: 0.0001,
        sellWeightRate: 0.0001,
        maxFailedLimit: 100,
        oneSiteName: EXCHANGE_SITES.BITFLYER,
        otherSiteName: EXCHANGE_SITES.ZAIF,
        status: RULE_STATUS.AVAILABLE,
      },
      query: {},
      headers: {},
    };
    const res = {};
    const next = jest.fn();

    const {
      validationErrors,
      middlewareCalledTimes,
    } = await validationErrorsResult(updateRuleValidator)(req, res, next);

    expect(next).toHaveBeenCalledTimes(middlewareCalledTimes);
    expect(validationErrors.isEmpty()).toBe(false);
    expect(validationErrors.array()[0]).toEqual({
      location: 'body',
      param: 'strategy',
      value: 'none',
      msg: 'The format of a priority was wrong.',
    });
  });

  test('should have an error about wrong coinUnit if the coinUnit is wrong value', async () => {
    const req = {
      body: {
        strategy: STRATEGIES.SIMPLE_ARBITRAGE,
        coinUnit: 'none',
        currencyUnit: CURRENCY_UNITS.JPY,
        orderType: ORDER_TYPES.LIMIT_ORDER,
        assetRange: 0.8,
        assetMinLimit: 1000,
        buyWeightRate: 0.0001,
        sellWeightRate: 0.0001,
        maxFailedLimit: 100,
        oneSiteName: EXCHANGE_SITES.BITFLYER,
        otherSiteName: EXCHANGE_SITES.ZAIF,
        status: RULE_STATUS.AVAILABLE,
      },
      query: {},
      headers: {},
    };
    const res = {};
    const next = jest.fn();

    const {
      validationErrors,
      middlewareCalledTimes,
    } = await validationErrorsResult(updateRuleValidator)(req, res, next);

    expect(next).toHaveBeenCalledTimes(middlewareCalledTimes);
    expect(validationErrors.isEmpty()).toBe(false);
    expect(validationErrors.array()[0]).toEqual({
      location: 'body',
      msg: 'The format of a coinUnit was wrong.',
      param: 'coinUnit',
      value: 'none',
    });
  });

  test('should have an error about wrong currencyUnit if the currencyUnit is wrong value', async () => {
    const req = {
      body: {
        strategy: STRATEGIES.SIMPLE_ARBITRAGE,
        coinUnit: COIN_UNITS.BTC,
        currencyUnit: 'none',
        orderType: ORDER_TYPES.LIMIT_ORDER,
        assetRange: 0.8,
        assetMinLimit: 1000,
        buyWeightRate: 0.0001,
        sellWeightRate: 0.0001,
        maxFailedLimit: 100,
        oneSiteName: EXCHANGE_SITES.BITFLYER,
        otherSiteName: EXCHANGE_SITES.ZAIF,
        status: RULE_STATUS.AVAILABLE,
      },
      query: {},
      headers: {},
    };
    const res = {};
    const next = jest.fn();

    const {
      validationErrors,
      middlewareCalledTimes,
    } = await validationErrorsResult(updateRuleValidator)(req, res, next);

    expect(next).toHaveBeenCalledTimes(middlewareCalledTimes);
    expect(validationErrors.isEmpty()).toBe(false);
    expect(validationErrors.array()[0]).toEqual({
      location: 'body',
      msg: 'The format of a currencyUnit was wrong.',
      param: 'currencyUnit',
      value: 'none',
    });
  });

  test('should have an error about wrong orderType if the orderType is wrong value', async () => {
    const req = {
      body: {
        strategy: STRATEGIES.SIMPLE_ARBITRAGE,
        coinUnit: COIN_UNITS.BTC,
        currencyUnit: CURRENCY_UNITS.CAD,
        orderType: 'none',
        assetRange: 0.8,
        assetMinLimit: 1000,
        buyWeightRate: 0.0001,
        sellWeightRate: 0.0001,
        maxFailedLimit: 100,
        oneSiteName: EXCHANGE_SITES.BITFLYER,
        otherSiteName: EXCHANGE_SITES.ZAIF,
        status: RULE_STATUS.AVAILABLE,
      },
      query: {},
      headers: {},
    };
    const res = {};
    const next = jest.fn();

    const {
      validationErrors,
      middlewareCalledTimes,
    } = await validationErrorsResult(updateRuleValidator)(req, res, next);

    expect(next).toHaveBeenCalledTimes(middlewareCalledTimes);
    expect(validationErrors.isEmpty()).toBe(false);
    expect(validationErrors.array()[0]).toEqual({
      location: 'body',
      msg: 'The format of a orderType was wrong.',
      param: 'orderType',
      value: 'none',
    });
  });

  test('should have an error if the assetRange is (MIN-1) value', async () => {
    const req = {
      body: {
        strategy: STRATEGIES.SIMPLE_ARBITRAGE,
        coinUnit: COIN_UNITS.BTC,
        currencyUnit: CURRENCY_UNITS.CAD,
        orderType: ORDER_TYPES.LIMIT_ORDER,
        assetRange: -1,
        assetMinLimit: 1000,
        buyWeightRate: 0.0001,
        sellWeightRate: 0.0001,
        maxFailedLimit: 100,
        oneSiteName: EXCHANGE_SITES.BITFLYER,
        otherSiteName: EXCHANGE_SITES.ZAIF,
        status: RULE_STATUS.AVAILABLE,
      },
      query: {},
      headers: {},
    };
    const res = {};
    const next = jest.fn();

    const {
      validationErrors,
      middlewareCalledTimes,
    } = await validationErrorsResult(updateRuleValidator)(req, res, next);

    expect(next).toHaveBeenCalledTimes(middlewareCalledTimes);
    expect(validationErrors.isEmpty()).toBe(false);
    expect(validationErrors.array()[0]).toEqual({
      location: 'body',
      param: 'assetRange',
      value: -1,
      msg: 'The length of an assetRange must be between 0 and 1.',
    });
  });

  test('should have an error if the assetRange is (MAX+1) value', async () => {
    const req = {
      body: {
        strategy: STRATEGIES.SIMPLE_ARBITRAGE,
        coinUnit: COIN_UNITS.BTC,
        currencyUnit: CURRENCY_UNITS.CAD,
        orderType: ORDER_TYPES.LIMIT_ORDER,
        assetRange: 2,
        assetMinLimit: 1000,
        buyWeightRate: 0.0001,
        sellWeightRate: 0.0001,
        maxFailedLimit: 100,
        oneSiteName: EXCHANGE_SITES.BITFLYER,
        otherSiteName: EXCHANGE_SITES.ZAIF,
        status: RULE_STATUS.AVAILABLE,
      },
      query: {},
      headers: {},
    };
    const res = {};
    const next = jest.fn();

    const {
      validationErrors,
      middlewareCalledTimes,
    } = await validationErrorsResult(updateRuleValidator)(req, res, next);

    expect(next).toHaveBeenCalledTimes(middlewareCalledTimes);
    expect(validationErrors.isEmpty()).toBe(false);
    expect(validationErrors.array()[0]).toEqual({
      location: 'body',
      param: 'assetRange',
      value: 2,
      msg: 'The length of an assetRange must be between 0 and 1.',
    });
  });

  test('should have an error if the assetMinLimit is (MIN-1) value', async () => {
    const req = {
      body: {
        strategy: STRATEGIES.SIMPLE_ARBITRAGE,
        coinUnit: COIN_UNITS.BTC,
        currencyUnit: CURRENCY_UNITS.CAD,
        orderType: ORDER_TYPES.LIMIT_ORDER,
        assetRange: 0.8,
        assetMinLimit: -1,
        buyWeightRate: 0.0001,
        sellWeightRate: 0.0001,
        maxFailedLimit: 100,
        oneSiteName: EXCHANGE_SITES.BITFLYER,
        otherSiteName: EXCHANGE_SITES.ZAIF,
        status: RULE_STATUS.AVAILABLE,
      },
      query: {},
      headers: {},
    };
    const res = {};
    const next = jest.fn();

    const {
      validationErrors,
      middlewareCalledTimes,
    } = await validationErrorsResult(updateRuleValidator)(req, res, next);

    expect(next).toHaveBeenCalledTimes(middlewareCalledTimes);
    expect(validationErrors.isEmpty()).toBe(false);
    expect(validationErrors.array()[0]).toEqual({
      location: 'body',
      msg: 'The length of an assetMinLimit must be more than 0.',
      param: 'assetMinLimit',
      value: -1,
    });
  });

  test('should have an error if the buyWeightRate is (MIN-1) value', async () => {
    const req = {
      body: {
        strategy: STRATEGIES.SIMPLE_ARBITRAGE,
        coinUnit: COIN_UNITS.BTC,
        currencyUnit: CURRENCY_UNITS.CAD,
        orderType: ORDER_TYPES.LIMIT_ORDER,
        assetRange: 0.8,
        assetMinLimit: 1000,
        buyWeightRate: -1,
        sellWeightRate: 0.0001,
        maxFailedLimit: 100,
        oneSiteName: EXCHANGE_SITES.BITFLYER,
        otherSiteName: EXCHANGE_SITES.ZAIF,
        status: RULE_STATUS.AVAILABLE,
      },
      query: {},
      headers: {},
    };
    const res = {};
    const next = jest.fn();

    const {
      validationErrors,
      middlewareCalledTimes,
    } = await validationErrorsResult(updateRuleValidator)(req, res, next);

    expect(next).toHaveBeenCalledTimes(middlewareCalledTimes);
    expect(validationErrors.isEmpty()).toBe(false);
    expect(validationErrors.array()[0]).toEqual({
      location: 'body',
      msg: 'The length of a buyWeightRate must be more than 0.',
      param: 'buyWeightRate',
      value: -1,
    });
  });

  test('should have an error if the sellWeightRate is (MIN-1) value', async () => {
    const req = {
      body: {
        strategy: STRATEGIES.SIMPLE_ARBITRAGE,
        coinUnit: COIN_UNITS.BTC,
        currencyUnit: CURRENCY_UNITS.CAD,
        orderType: ORDER_TYPES.LIMIT_ORDER,
        assetRange: 0.8,
        assetMinLimit: 1000,
        buyWeightRate: 0.0001,
        sellWeightRate: -1,
        maxFailedLimit: 100,
        oneSiteName: EXCHANGE_SITES.BITFLYER,
        otherSiteName: EXCHANGE_SITES.ZAIF,
        status: RULE_STATUS.AVAILABLE,
      },
      query: {},
      headers: {},
    };
    const res = {};
    const next = jest.fn();

    const {
      validationErrors,
      middlewareCalledTimes,
    } = await validationErrorsResult(updateRuleValidator)(req, res, next);

    expect(next).toHaveBeenCalledTimes(middlewareCalledTimes);
    expect(validationErrors.isEmpty()).toBe(false);
    expect(validationErrors.array()[0]).toEqual({
      location: 'body',
      msg: 'The length of a sellWeightRate must be more than 0.',
      param: 'sellWeightRate',
      value: -1,
    });
  });

  test('should have an error if the maxFailedLimit is (MIN-1) value', async () => {
    const req = {
      body: {
        strategy: STRATEGIES.SIMPLE_ARBITRAGE,
        coinUnit: COIN_UNITS.BTC,
        currencyUnit: CURRENCY_UNITS.CAD,
        orderType: ORDER_TYPES.LIMIT_ORDER,
        assetRange: 0.8,
        assetMinLimit: 1000,
        buyWeightRate: 0.0001,
        sellWeightRate: 0.0001,
        maxFailedLimit: -1,
        oneSiteName: EXCHANGE_SITES.BITFLYER,
        otherSiteName: EXCHANGE_SITES.ZAIF,
        status: RULE_STATUS.AVAILABLE,
      },
      query: {},
      headers: {},
    };
    const res = {};
    const next = jest.fn();

    const {
      validationErrors,
      middlewareCalledTimes,
    } = await validationErrorsResult(updateRuleValidator)(req, res, next);

    expect(next).toHaveBeenCalledTimes(middlewareCalledTimes);
    expect(validationErrors.isEmpty()).toBe(false);
    expect(validationErrors.array()[0]).toEqual({
      location: 'body',
      msg: 'The length of a maxFailedLimit must be between 0 and 1000.',
      param: 'maxFailedLimit',
      value: -1,
    });
  });

  test('should have an error if the maxFailedLimit is (MAX+1) value', async () => {
    const req = {
      body: {
        strategy: STRATEGIES.SIMPLE_ARBITRAGE,
        coinUnit: COIN_UNITS.BTC,
        currencyUnit: CURRENCY_UNITS.CAD,
        orderType: ORDER_TYPES.LIMIT_ORDER,
        assetRange: 0.8,
        assetMinLimit: 1000,
        buyWeightRate: 0.0001,
        sellWeightRate: 0.0001,
        maxFailedLimit: 1001,
        oneSiteName: EXCHANGE_SITES.BITFLYER,
        otherSiteName: EXCHANGE_SITES.ZAIF,
        status: RULE_STATUS.AVAILABLE,
      },
      query: {},
      headers: {},
    };
    const res = {};
    const next = jest.fn();

    const {
      validationErrors,
      middlewareCalledTimes,
    } = await validationErrorsResult(updateRuleValidator)(req, res, next);

    expect(next).toHaveBeenCalledTimes(middlewareCalledTimes);
    expect(validationErrors.isEmpty()).toBe(false);
    expect(validationErrors.array()[0]).toEqual({
      location: 'body',
      msg: 'The length of a maxFailedLimit must be between 0 and 1000.',
      param: 'maxFailedLimit',
      value: 1001,
    });
  });

  test('should have an error about wrong oneSiteName if the oneSiteName is wrong value', async () => {
    const req = {
      body: {
        strategy: STRATEGIES.SIMPLE_ARBITRAGE,
        coinUnit: COIN_UNITS.BTC,
        currencyUnit: CURRENCY_UNITS.CAD,
        orderType: ORDER_TYPES.LIMIT_ORDER,
        assetRange: 0.8,
        assetMinLimit: 1000,
        buyWeightRate: 0.0001,
        sellWeightRate: 0.0001,
        maxFailedLimit: 100,
        oneSiteName: 'none',
        otherSiteName: EXCHANGE_SITES.ZAIF,
        status: RULE_STATUS.AVAILABLE,
      },
      query: {},
      headers: {},
    };
    const res = {};
    const next = jest.fn();

    const {
      validationErrors,
      middlewareCalledTimes,
    } = await validationErrorsResult(updateRuleValidator)(req, res, next);

    expect(next).toHaveBeenCalledTimes(middlewareCalledTimes);
    expect(validationErrors.isEmpty()).toBe(false);
    expect(validationErrors.array()[0]).toEqual({
      location: 'body',
      msg: 'The format of an oneSiteName was wrong.',
      param: 'oneSiteName',
      value: 'none',
    });
  });

  test('should have an error about wrong otherSiteName if the otherSiteName is wrong value', async () => {
    const req = {
      body: {
        strategy: STRATEGIES.SIMPLE_ARBITRAGE,
        coinUnit: COIN_UNITS.BTC,
        currencyUnit: CURRENCY_UNITS.CAD,
        orderType: ORDER_TYPES.LIMIT_ORDER,
        assetRange: 0.8,
        assetMinLimit: 1000,
        buyWeightRate: 0.0001,
        sellWeightRate: 0.0001,
        maxFailedLimit: 100,
        oneSiteName: EXCHANGE_SITES.ZAIF,
        otherSiteName: 'none',
        status: RULE_STATUS.AVAILABLE,
      },
      query: {},
      headers: {},
    };
    const res = {};
    const next = jest.fn();

    const {
      validationErrors,
      middlewareCalledTimes,
    } = await validationErrorsResult(updateRuleValidator)(req, res, next);

    expect(next).toHaveBeenCalledTimes(middlewareCalledTimes);
    expect(validationErrors.isEmpty()).toBe(false);
    expect(validationErrors.array()[0]).toEqual({
      location: 'body',
      msg: 'The format of an otherSiteName was wrong.',
      param: 'otherSiteName',
      value: 'none',
    });
  });

  test('should have an error about wrong status if the status is wrong value', async () => {
    const req = {
      body: {
        strategy: STRATEGIES.SIMPLE_ARBITRAGE,
        coinUnit: COIN_UNITS.BTC,
        currencyUnit: CURRENCY_UNITS.CAD,
        orderType: ORDER_TYPES.LIMIT_ORDER,
        assetRange: 0.8,
        assetMinLimit: 1000,
        buyWeightRate: 0.0001,
        sellWeightRate: 0.0001,
        maxFailedLimit: 100,
        oneSiteName: EXCHANGE_SITES.ZAIF,
        otherSiteName: EXCHANGE_SITES.BITFLYER,
        status: 'none',
      },
      query: {},
      headers: {},
    };
    const res = {};
    const next = jest.fn();

    const {
      validationErrors,
      middlewareCalledTimes,
    } = await validationErrorsResult(updateRuleValidator)(req, res, next);

    expect(next).toHaveBeenCalledTimes(middlewareCalledTimes);
    expect(validationErrors.isEmpty()).toBe(false);
    expect(validationErrors.array()[0]).toEqual({
      location: 'body',
      msg: 'The format of a status was wrong.',
      param: 'status',
      value: 'none',
    });
  });
});
