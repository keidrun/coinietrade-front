const { checkSchema, validationResult } = require('express-validator/check');
const { isEmpty, isEmail } = require('validator');

const customChecks = {
  isEmptyOrEmail: params => {
    return isEmpty(params) ? true : isEmail(params);
  }
};

const validateUserSchema = checkSchema({
  displayName: {
    in: ['body'],
    isLength: {
      options: { min: 1, max: 50 },
      errorMessage: 'The length of displayName must be between 1 and 50.'
    },
    errorMessage: 'The format of displayName was wrong.'
  },
  email: {
    optional: true,
    in: ['body'],
    custom: {
      options: params => customChecks.isEmptyOrEmail(params)
    },
    errorMessage: 'The format of email was wrong.'
  },
  gender: {
    optional: true,
    in: ['body'],
    isIn: {
      options: [['male', 'female']]
    },
    errorMessage: 'The format of gender was wrong.'
  },
  language: {
    optional: true,
    in: ['body'],
    isIn: {
      options: [['en', 'jp']]
    },
    errorMessage: 'The format of language was wrong.'
  }
});

const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.mapped() });
  }
  next();
};

module.exports = {
  validateUserSchema,
  handleValidationErrors
};
