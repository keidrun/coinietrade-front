/* eslint-disable global-require */
module.exports = (app, server) => {
  require('./v1/authRoutes')(app);
  require('./v1/userRoutes')(app);
  require('./v1/eventRoutes')(app);
  require('./v1/socketRoutes')(server);
};
/* eslint-enable global-require */
