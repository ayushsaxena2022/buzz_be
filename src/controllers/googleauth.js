require("dotenv").config
var GoogleStrategy = require('passport-google-oauth20').Strategy;
const passport = require("passport");
const config=require('config')
passport.serializeUser(function (user, cb) {
  cb(null, user);
});
passport.deserializeUser(function (obj, cb) {
  cb(null, obj);
});
  passport.use(new GoogleStrategy({
  clientID:process.env.GOOGLE_CLIENT_ID ,
  clientSecret:process.env.GOOGLE_SECRET ,
  callbackURL: config.get('callBack_URL')
}, function (accessToken, refreshToken, profile, done) {
   done(null, { profile });
   }
   ));
