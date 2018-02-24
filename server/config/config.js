require('dotenv').config();

const config = {
  production: {
    SECRET: process.env.PROD_SECRET_KEY,
    DATABASE: process.env.PROD_DB_URI
  },
  default: {
    SECRET: process.env.DEV_SECRET_KEY,
    DATABASE: process.env.DEV_DB_URI
  }
};

exports.get = function get(env) {
  return config[env] || config.default;
};
