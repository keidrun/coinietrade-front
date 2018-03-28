const mongoose = require('mongoose');
const keys = require('../../src/config/keys').get(process.env.NODE_ENV);

before(done => {
  mongoose.connect(keys.mongoURL);
  mongoose.connection
    .once('open', () => {
      done();
    })
    .on('error', err => {
      console.warn('Faild to open mongodb', err);
    });
});

after(() => {
  return mongoose.connection.close();
});
