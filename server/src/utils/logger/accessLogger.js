const { morgan, LOG_FORMAT } = require('./morgan');

const logFormat =
  !process.env.NODE_ENV || process.env.NODE_ENV === 'development'
    ? 'dev'
    : LOG_FORMAT;

module.exports = options =>
  morgan(logFormat, {
    skip(req, res) {
      return res.statusCode >= 400;
    },
    stream: process.stdout,
    ...options,
  });
