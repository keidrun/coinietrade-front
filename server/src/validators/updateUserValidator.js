const { checkSchema } = require('express-validator/check');
const { isEmpty, isEmail } = require('validator');
const { GENDER, LANGUAGE } = require('../models/User');

const customChecks = {
  isEmptyOrEmail: params => (isEmpty(params) ? true : isEmail(params)),
};

const updateUserValidator = checkSchema({
  displayName: {
    in: ['body'],
    isLength: {
      options: { min: 1, max: 50 },
      errorMessage: 'The length of displayName must be between 1 and 50.',
    },
    errorMessage: 'The format of displayName was wrong.',
  },
  email: {
    optional: true,
    in: ['body'],
    custom: {
      options: params => customChecks.isEmptyOrEmail(params),
    },
    errorMessage: 'The format of email was wrong.',
  },
  gender: {
    optional: true,
    in: ['body'],
    isIn: {
      options: [Object.values(GENDER)],
    },
    errorMessage: 'The format of gender was wrong.',
  },
  language: {
    optional: true,
    in: ['body'],
    isIn: {
      options: [Object.values(LANGUAGE)],
    },
    errorMessage: 'The format of language was wrong.',
  },
});

module.exports = updateUserValidator;
