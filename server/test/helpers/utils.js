const path = require('path');

// eslint-disable-next-line import/no-dynamic-require
const httpAdapter = require(path.join(
  path.dirname(require.resolve('axios')),
  'lib/adapters/http',
));

module.exports = {
  httpAdapter,
};
