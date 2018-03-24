const { checkSchema, validationResult } = require('express-validator/check');

const validateUserSchema = checkSchema({
  displayName: {
    in: ['body'],
    isLength: {
      errorMessage: 'The length of displayName must be between 1 and 50.',
      options: { min: 1, max: 50 }
    }
  },
  email: {
    optional: true,
    in: ['body'],
    isEmail: {
      errorMessage: 'The format of email was wrong.'
    }
  },
  gender: {
    optional: true,
    in: ['body'],
    isIn: {
      options: [['male', 'female']],
      errorMessage: 'The gender was wrong.'
    }
  },
  language: {
    optional: true,
    in: ['body'],
    isIn: {
      options: [['en', 'jp']],
      errorMessage: 'The language was wrong.'
    }
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
