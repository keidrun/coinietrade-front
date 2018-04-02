module.exports = (app, server) => {
  require('./v1/authRoutes')(app);
  require('./v1/userRoutes')(app);
  require('./v1/apikeyRoutes')(app);
  require('./v1/settingRoutes')(app);
  require('./v1/eventRoutes')(app);
  require('./v1/socketRoutes')(server);
};
