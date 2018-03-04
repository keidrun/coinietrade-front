const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const mongoose = require('mongoose');
const keys = require('./config/keys').get(process.env.NODE_ENV);

const app = express();
const PORT = process.env.PORT || 3001;

require('./services/passportStrategies');

mongoose.connect(keys.mongoURL);

app.use(bodyParser.json());
app.use(cookieParser());

app.use(passport.initialize());

require('./routes/authRoutes')(app);
require('./routes/userRoutes')(app);

app.listen(PORT, () => {
  console.log(`Server up on ${PORT}`);
});

process.on('unhandledRejection', console.dir);
