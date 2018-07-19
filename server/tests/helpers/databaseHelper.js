const mongoose = require('mongoose');
const keys = require('../../config/keys').get(process.env.NODE_ENV);

const setupDatabase = async () => {
  try {
    await mongoose.connect(keys.mongoURL, { useNewUrlParser: true });
  } catch(error) {
    console.warn('Faild to open mongodb', err);
  }
}

module.exports = {
  setupDatabase
}
