/* eslint-disable */
require('dotenv').config();
/* eslint-enable */

const config = {
  production: {
    mongoURL: process.env.PROD_MONGO_URI,
    tokenSecret: process.env.PROD_TOKEN_SECRET,
    cookieKey: process.env.PROD_COOKIE_KEY,
    facebookClientId: process.env.PROD_FACEBOOK_CLIENT_ID,
    facebookClientSecret: process.env.PROD_FACEBOOK_CLIENT_SECRET,
    googleClientId: process.env.PROD_GOOGLE_CLIENT_ID,
    googleClientSecret: process.env.PROD_GOOGLE_CLIENT_SECRET,
    meetupApiKey: process.env.PROD_MEETUP_API_KEY,
    encryptKey: process.env.PROD_ENCRYPT_KEY,
    proxyURL: process.env.PROD_PROXY_URL
  },
  staging: {
    mongoURL: process.env.STAGING_MONGO_URI,
    tokenSecret: process.env.STAGING_TOKEN_SECRET,
    cookieKey: process.env.STAGING_COOKIE_KEY,
    facebookClientId: process.env.STAGING_FACEBOOK_CLIENT_ID,
    facebookClientSecret: process.env.STAGING_FACEBOOK_CLIENT_SECRET,
    googleClientId: process.env.STAGING_GOOGLE_CLIENT_ID,
    googleClientSecret: process.env.STAGING_GOOGLE_CLIENT_SECRET,
    meetupApiKey: process.env.STAGING_MEETUP_API_KEY,
    encryptKey: process.env.STAGING_ENCRYPT_KEY,
    proxyURL: process.env.STAGING_PROXY_URL
  },
  ci: {
    mongoURL: process.env.PRE_MONGO_URI,
    tokenSecret: process.env.PRE_TOKEN_SECRET,
    cookieKey: process.env.PRE_COOKIE_KEY,
    facebookClientId: process.env.PRE_FACEBOOK_CLIENT_ID,
    facebookClientSecret: process.env.PRE_FACEBOOK_CLIENT_SECRET,
    googleClientId: process.env.PRE_GOOGLE_CLIENT_ID,
    googleClientSecret: process.env.PRE_GOOGLE_CLIENT_SECRET,
    meetupApiKey: process.env.PRE_MEETUP_API_KEY,
    encryptKey: process.env.PRE_ENCRYPT_KEY,
    proxyURL: process.env.PRE_PROXY_URL
  },
  test: {
    mongoURL: process.env.TEST_MONGO_URI,
    tokenSecret: process.env.TEST_TOKEN_SECRET,
    cookieKey: process.env.TEST_COOKIE_KEY,
    facebookClientId: process.env.TEST_FACEBOOK_CLIENT_ID,
    facebookClientSecret: process.env.TEST_FACEBOOK_CLIENT_SECRET,
    googleClientId: process.env.TEST_GOOGLE_CLIENT_ID,
    googleClientSecret: process.env.TEST_GOOGLE_CLIENT_SECRET,
    meetupApiKey: process.env.TEST_MEETUP_API_KEY,
    encryptKey: process.env.TEST_ENCRYPT_KEY,
    proxyURL: process.env.TEST_PROXY_URL
  },
  default: {
    mongoURL: process.env.DEV_MONGO_URI,
    tokenSecret: process.env.DEV_TOKEN_SECRET,
    cookieKey: process.env.DEV_COOKIE_KEY,
    facebookClientId: process.env.DEV_FACEBOOK_CLIENT_ID,
    facebookClientSecret: process.env.DEV_FACEBOOK_CLIENT_SECRET,
    googleClientId: process.env.DEV_GOOGLE_CLIENT_ID,
    googleClientSecret: process.env.DEV_GOOGLE_CLIENT_SECRET,
    meetupApiKey: process.env.DEV_MEETUP_API_KEY,
    encryptKey: process.env.DEV_ENCRYPT_KEY,
    proxyURL: process.env.DEV_PROXY_URL
  }
};

module.exports.get = function get(env) {
  return config[env] || config.default;
};
