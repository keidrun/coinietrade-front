const mongoose = require('mongoose');
const keys = require('../../config/keys').get(process.env.NODE_ENV);

const connect = () =>
  mongoose.connect(
    process.env.MONGODB_URI || keys.mongoURL,
    { useNewUrlParser: true },
  );

module.exports = { connect };
