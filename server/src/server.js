const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const mongoose = require('mongoose');
const helmet = require('helmet');
const keys = require('../config/keys').get(process.env.NODE_ENV);

const errorHandler = require('./middleware/errorHandler');

const PORT = process.env.PORT || 5000;
const app = express();
const server = http.createServer(app);

require('./services/passportStrategies');

mongoose.connect(
  process.env.MONGODB_URI || keys.mongoURL,
  { useNewUrlParser: true },
);

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
app.use(bodyParser.json());
app.use(cookieParser());

app.use(passport.initialize());

require('./routes/apiRoutes')(app, server);

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
