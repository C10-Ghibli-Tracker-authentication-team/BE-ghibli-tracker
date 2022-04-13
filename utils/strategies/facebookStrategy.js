const {Strategy} = require('passport-facebook');


const FacebookStrategy = new Strategy(
  {
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: `http://${process.env.HOST}:${process.env.PORT}/auth/facebook/callback`,
  },
  function (token, tokenSecret, profile, done) {
    return done(null, profile);
  }
);


module.exports = FacebookStrategy;

