const { checkSchema } = require('express-validator/check');
const {
  STRATEGIES,
  ORDER_TYPES,
  COIN_UNITS,
  CURRENCY_UNITS,
  EXCHANGE_SITES,
  RULE_STATUS,
} = require('./constants');

const updateRuleValidator = checkSchema({
  strategy: {
    optional: true,
    in: ['body'],
    isIn: {
      options: [Object.values(STRATEGIES)],
    },
    errorMessage: 'The format of a priority was wrong.',
  },
  coinUnit: {
    optional: true,
    in: ['body'],
    isIn: {
      options: [Object.values(COIN_UNITS)],
    },
    errorMessage: 'The format of a coinUnit was wrong.',
  },
  currencyUnit: {
    optional: true,
    in: ['body'],
    isIn: {
      options: [Object.values(CURRENCY_UNITS)],
    },
    errorMessage: 'The format of a currencyUnit was wrong.',
  },
  orderType: {
    optional: true,
    in: ['body'],
    isIn: {
      options: [Object.values(ORDER_TYPES)],
    },
    errorMessage: 'The format of a orderType was wrong.',
  },
  assetRange: {
    optional: true,
    in: ['body'],
    isFloat: {
      options: { min: 0, max: 1 },
      errorMessage: 'The length of an assetRange must be between 0 and 1.',
    },
    errorMessage: 'The format of an assetRange was wrong.',
  },
  assetMinLimit: {
    optional: true,
    in: ['body'],
    isInt: {
      options: { min: 0 },
      errorMessage: 'The length of an assetMinLimit must be more than 0.',
    },
    errorMessage: 'The format of an assetMinLimit was wrong.',
  },
  buyWeightRate: {
    optional: true,
    in: ['body'],
    isFloat: {
      options: { min: 0 },
      errorMessage: 'The length of a buyWeightRate must be more than 0.',
    },
    errorMessage: 'The format of a buyWeightRate was wrong.',
  },
  sellWeightRate: {
    optional: true,
    in: ['body'],
    isFloat: {
      options: { min: 0 },
      errorMessage: 'The length of a sellWeightRate must be more than 0.',
    },
    errorMessage: 'The format of a sellWeightRate was wrong.',
  },
  maxFailedLimit: {
    optional: true,
    in: ['body'],
    isInt: {
      options: { min: 0, max: 1000 },
      errorMessage:
        'The length of a maxFailedLimit must be between 0 and 1000.',
    },
    errorMessage: 'The format of a maxFailedLimit was wrong.',
  },
  oneSiteName: {
    optional: true,
    in: ['body'],
    isIn: {
      options: [Object.values(EXCHANGE_SITES)],
    },
    errorMessage: 'The format of an oneSiteName was wrong.',
  },
  otherSiteName: {
    optional: true,
    in: ['body'],
    isIn: {
      options: [Object.values(EXCHANGE_SITES)],
    },
    errorMessage: 'The format of an otherSiteName was wrong.',
  },
  status: {
    optional: true,
    in: ['body'],
    isIn: {
      options: [Object.values(RULE_STATUS)],
    },
    errorMessage: 'The format of a status was wrong.',
  },
});

module.exports = updateRuleValidator;
