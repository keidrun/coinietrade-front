const morgan = require('morgan');

morgan.token('id', req => req.id);

// combined + req.id
const LOG_FORMAT =
  ':remote-addr - :remote-user [:date[clf]] [:id] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent"';

module.exports = { morgan, LOG_FORMAT };
