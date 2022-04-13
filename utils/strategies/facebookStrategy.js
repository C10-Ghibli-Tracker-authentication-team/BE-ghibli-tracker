const { Strategy } = require('passport-facebook');
const request = require('request');

let url = ''
if (process.env.NODE_ENV === 'development') {
  url = `http://${process.env.HOST}:${process.env.PORT}/auth/facebook/callback`
} else {
  url = `https://${process.env.HOST}/auth/facebook/callback`
}
const FacebookStrategy = new Strategy(
  {
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: url,
    profileFields: ['id', 'email', 'link', 'locale', 'name',
      'timezone', 'updated_time', 'verified', 'displayName']
  },
  function (token, tokenSecret, profile, done) {
    let url = "https://graph.facebook.com/v3.2/me?" +
      "fields=id,name,email,first_name,last_name&access_token=" + token;

    request({
      url: url,
      json: true
    }, function (err, response, body) {
      let email = body.email;  // body.email contains your email
      console.log(body);
    });

    return done(null, profile);
  }
);


module.exports = FacebookStrategy;

