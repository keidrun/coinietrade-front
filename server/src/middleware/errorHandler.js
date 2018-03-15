const errorHandler = (err, req, res, next) => {
  return res.status(500).send({
    error: {
      message: err.message
    }
  });
};

module.exports = errorHandler;
