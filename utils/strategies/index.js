const passport = require('passport');
const facebookStrategy = require('./facebookStrategy');
passport.use(facebookStrategy);