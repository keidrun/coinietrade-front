const path = require('path');
const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const socketIO = require('socket.io');
const helmet = require('helmet');
const addRequestId = require('express-request-id');
const { mongooseService, passportService } = require('./services');
const routes = require('./routes/v1');
const sockets = require('./sockets/v1');
const { errorHandler } = require('./middleware');
const { accessLogger, errorLogger } = require('./utils/logger');

mongooseService.connect();

const PORT = process.env.PORT || 5000;
const app = express();
const server = http.createServer(app);

// Initialize App
app.use(bodyParser.json());
app.use(cookieParser());
app.use(passportService.initialize());

// Loggers
app.use(addRequestId());
app.use(accessLogger());
app.use(errorLogger());

// Security
app.use(
  helmet({
    dnsPrefetchControl: true,
    frameguard: true,
    hidePoweredBy: true,
    hsts: true,
    ieNoOpen: true,
    noSniff: true,
    xssFilter: true,
  }),
);

// API Routes
app.use('/auth', routes.passportRoutes);
app.use('/api/v1/auth', routes.authRoutes);
app.use('/api/v1/events', routes.eventsRoutes);
app.use('/api/v1/user', routes.userRoutes);
app.use('/api/v1/rules', routes.rulesRoutes);
app.use('/api/v1/policy', routes.policyRoutes);

// Socket paths
sockets.dashboardSocket(
  socketIO(server, {
    path: '/api/v1/socket',
  }),
);

// Serve Client App
if (
  process.env.NODE_ENV === 'production' ||
  process.env.NODE_ENV === 'staging' ||
  process.env.NODE_ENV === 'ci'
) {
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(
      path.resolve(__dirname, '../../client', 'build', 'index.html'),
    );
  });
}

// Final error handler
app.use(errorHandler);

// Listen
server.listen(PORT, () => {
  console.log(`Server up on ${PORT}`);
});

module.exports = server;
