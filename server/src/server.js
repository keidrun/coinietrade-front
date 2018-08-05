const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const socketIO = require('socket.io');
const helmet = require('helmet');
const morgan = require('morgan');
const mongooseService = require('./services/mongooseService');
const passportService = require('./services/passportService');
const routes = require('./routes/v1');
const sockets = require('./sockets/v1');

const errorHandler = require('./middleware/errorHandler');

const PORT = process.env.PORT || 5000;
const app = express();
const server = http.createServer(app);
passportService.configureStrategies(passport);
mongooseService.connect();

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
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(cookieParser());

app.use(passport.initialize());

app.use('/auth', routes.passportRoutes);
app.use('/api/v1/auth', routes.authRoutes);
app.use('/api/v1/events', routes.eventRoutes);
app.use('/api/v1/user', routes.userRoutes);
sockets.dashboardSocket(
  socketIO(server, {
    path: '/api/v1/socket',
  }),
);

if (
  process.env.NODE_ENV === 'production' ||
  process.env.NODE_ENV === 'staging' ||
  process.env.NODE_ENV === 'ci'
) {
  app.use(express.static('client/build'));

  // eslint-disable-next-line global-require
  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(
      path.resolve(__dirname, '../../client', 'build', 'index.html'),
    );
  });
}

app.use(errorHandler);

server.listen(PORT, () => {
  console.log(`Server up on ${PORT}`);
});
