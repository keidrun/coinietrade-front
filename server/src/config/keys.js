require('dotenv').config();

const config = {
  production: {
    mongoURL: process.env.MONGO_URL,
    tokenSecret: process.env.TOKEN_SECRET,
    cookieKey: process.env.COOKIE_KEY,
    facebookClientId: process.env.FACEBOOK_CLIENT_ID,
    facebookClientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    googleClientId: process.env.GOOGLE_CLIENT_ID,
    googleClientSecret: process.env.GOOGLE_CLIENT_SECRET
  },
  default: {
    mongoURL: process.env.DEV_MONGO_URL,
    tokenSecret: process.env.DEV_TOKEN_SECRET,
    cookieKey: process.env.DEV_COOKIE_KEY,
    facebookClientId: process.env.DEV_FACEBOOK_CLIENT_ID,
    facebookClientSecret: process.env.DEV_FACEBOOK_CLIENT_SECRET,
    googleClientId: process.env.DEV_GOOGLE_CLIENT_ID,
    googleClientSecret: process.env.DEV_GOOGLE_CLIENT_SECRET
  }
};

exports.get = function get(env) {
  return config[env] || config.default;
};
