const { createLogger, format, transports } = require('winston');
const keys = require('../../../config/keys').get(process.env.NODE_ENV);

const level = keys.logLevel || 'debug';
const { combine, timestamp, label, printf } = format;
const logFormat = printf(
  info => `${info.timestamp} [${info.label}] ${info.level}: ${info.message}`,
);

const logger = loggerLabel =>
  createLogger({
    level,
    format: combine(
      label({ label: loggerLabel || 'default' }),
      timestamp(),
      logFormat,
    ),
    transports: [new transports.Console()],
  });

module.exports = logger;
