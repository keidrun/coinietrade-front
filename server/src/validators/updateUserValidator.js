const { checkSchema } = require('express-validator/check');
const { isEmpty, isEmail } = require('validator');
const { GENDER, LANGUAGE, EXCHANGE_SITES } = require('../models/User');

const customChecks = {
  isEmptyOrEmail: params => (isEmpty(params) ? true : isEmail(params)),
  isValidApiProvider: secrets =>
    secrets.filter(
      ({ apiProvider }) =>
        Object.values(EXCHANGE_SITES).indexOf(apiProvider) === -1,
    ).length === 0,
  isNotDuplicatedApiProvider: secrets => {
    const apiProvidersList = Object.values(
      secrets
        .map(({ apiProvider }) => apiProvider)
        .reduce((providerMap, apiProvider) => {
          if (!providerMap[apiProvider]) {
            // eslint-disable-next-line no-param-reassign
            providerMap[apiProvider] = 1;
          } else {
            // eslint-disable-next-line no-param-reassign
            providerMap[apiProvider] += 1;
          }
          return providerMap;
        }, {}),
    );

    const isDuplicated =
      apiProvidersList.length !==
      apiProvidersList.reduce((total, value) => total + value, 0);

    if (isDuplicated) {
      return false;
    }
    return true;
  },
};

const updateUserValidator = checkSchema({
  displayName: {
    optional: true,
    in: ['body'],
    isLength: {
      options: { min: 1, max: 50 },
      errorMessage: 'The length of a displayName must be between 1 and 50.',
    },
    errorMessage: 'The format of an displayName was wrong.',
  },
  email: {
    optional: true,
    in: ['body'],
    custom: {
      options: params => customChecks.isEmptyOrEmail(params),
    },
    errorMessage: 'The format of an email was wrong.',
  },
  gender: {
    optional: true,
    in: ['body'],
    isIn: {
      options: [Object.values(GENDER)],
    },
    errorMessage: 'The format of a gender was wrong.',
  },
  language: {
    optional: true,
    in: ['body'],
    isIn: {
      options: [Object.values(LANGUAGE)],
    },
    errorMessage: 'The format of a language was wrong.',
  },
  secrets: {
    optional: true,
    in: ['body'],
    isArray: true,
    custom: {
      options: secrets =>
        customChecks.isValidApiProvider(secrets) &&
        customChecks.isNotDuplicatedApiProvider(secrets),
    },
    errorMessage: 'The format of secrets was wrong.',
  },
});

module.exports = updateUserValidator;
