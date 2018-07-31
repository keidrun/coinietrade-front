const { validationResult } = require('express-validator/check');

// eslint-disable-next-line consistent-return
const handleValidationErrors = (req, res, next) => {
  const validationErrors = validationResult(req);
  if (!validationErrors.isEmpty()) {
    const errors = validationErrors.array().map(error => ({
      location: error.location,
      param: error.param,
      value: error.value,
      message: error.msg,
      errorType: 'validationError',
    }));
    return res.status(422).json({ errors });
  }
  next();
};

module.exports = handleValidationErrors;
