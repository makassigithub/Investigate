const app = require('express')();

const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const keys = require('./config/keys');
const passport = require('passport');

require('./models/User');
require('./services/passport');

mongoose
  .connect(keys.mongodbURI)
  .then(() => console.log('mongoose is connected...'));

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey],
  })
);

app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log('Server listening at port: 5000'));
