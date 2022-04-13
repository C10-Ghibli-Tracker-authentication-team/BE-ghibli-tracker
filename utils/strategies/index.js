const passport = require('passport');
const facebookStrategy = require('./facebookStrategy');
const twitterStrategy = require('./twitterStrategy');
passport.use(facebookStrategy);
passport.use(twitterStrategy);