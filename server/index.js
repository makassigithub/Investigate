const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const keys = require('./config/keys');
const passport = require('passport');

const app = express();

require('./models/User');
require('./services/passport');

mongoose.connect(keys.mongodbURI).then(() => console.log('connected to DB...'));

app.use(bodyParser.json());

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey],
  })
);

app.use(passport.initialize());
app.use(passport.session());

if (process.env.NODE_ENV === 'production') {
  // The dev server does not exist anymore, express will serve both the back and ethe frontEnd

  // 1. instruct express to serve production static contents of the client from the build directory
  app.use(express.static('client/build'));

  // 2. Instrcut express to send back the index.html file for any route that is that not handle
  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

require('./routes/authRoutes')(app);
require('./routes/paymentRouts')(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log('Server listening at port: 5000'));
