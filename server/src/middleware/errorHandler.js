const errorHandler = (err, req, res, next) => {
  return res.status(500).json({
    errors: {
      route: {
        msg: err.message
      }
    }
  });
};

module.exports = errorHandler;
