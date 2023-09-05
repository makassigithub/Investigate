const passport = require('passport');

module.exports = (app) => {
  app.get(
    '/auth/google',
    passport.authenticate('google', {
      scope: ['profile', 'email'],
    })
  );

  app.get('/api/logout', (req, res) => {
    // the logout function is attached by passport and destroy
    //It removes the user cookie

    req.logout();
    res.send(req.user);
  });

  // When this kicks in, the code param his provided by google
  app.get('/auth/google/callback', passport.authenticate('google'));

  app.get('/api/current_user', (req, res) => {
    console.log(req.session);
    res.send(req.user);
  });
};
