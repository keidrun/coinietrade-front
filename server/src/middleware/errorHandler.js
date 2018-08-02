const errorHandler = (err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }
  return res.status(500).json({
    errors: [
      {
        message: err.message,
        errorType: 'serverError',
      },
    ],
  });
};

module.exports = errorHandler;
