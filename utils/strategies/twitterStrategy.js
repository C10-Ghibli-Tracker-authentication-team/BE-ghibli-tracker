const passport = require('passport');
const { Strategy } = require('passport-twitter');

passport.serializeUser(function(user, done) {
  done(null, user);
});
passport.deserializeUser(function(user, done) {
  done(null, user);
});

let url = ''
if (process.env.NODE_ENV === 'development') {
  url = `http://${process.env.HOST}:${process.env.PORT}/auth/twitter/callback`
} else {
  url = `https://${process.env.HOST}/auth/twitter/callback`
}
const TwitterStrategy = new Strategy(
  {
    consumerKey: process.env.TWITTER_CONSUMER_KEY,
    consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
    callbackURL: url,
    includeEmail: true
  },
  function (token, tokenSecret, profile, done) {
    return done(null, profile);
  }
);


module.exports = TwitterStrategy;
