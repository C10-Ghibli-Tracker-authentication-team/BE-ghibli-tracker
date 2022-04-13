const {Strategy} = require('passport-facebook');

let url = ''
if(process.env.NODE_ENV === 'development'){
  url = `http://${process.env.HOST}:${process.env.PORT}/auth/facebook/callback`
}else{
  url = `https://${process.env.HOST}/auth/facebook/callback`
}
const FacebookStrategy = new Strategy(
  {
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: url,
  },
  function (token, tokenSecret, profile, done) {
    return done(null, profile);
  }
);


module.exports = FacebookStrategy;

