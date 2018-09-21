const path = require('path');
const { validationResult } = require('express-validator/check');

// eslint-disable-next-line import/no-dynamic-require
const httpAdapter = require(path.join(
  path.dirname(require.resolve('axios')),
  'lib/adapters/http',
));

const validationErrorsResult = validator => async (req, res, next) => {
  const validatorPromises = validator.map(v => v(req, res, next));
  await Promise.all(validatorPromises);
  return {
    validationErrors: validationResult(req),
    middlewareCalledTimes: validatorPromises.length,
  };
};

module.exports = {
  httpAdapter,
  validationErrorsResult,
};
