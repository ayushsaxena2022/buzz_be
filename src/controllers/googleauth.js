var GoogleStrategy = require('passport-google-oauth20').Strategy;
const passport = require("passport");

passport.serializeUser(function (user, cb) {
  cb(null, user);
});

passport.deserializeUser(function (obj, cb) {
  cb(null, obj);
});

passport.use(new GoogleStrategy({
  clientID: "685162911867-20i18648jcb4dnj5jlcn0abvbcv4hmh0.apps.googleusercontent.com",
  clientSecret: "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",
  callbackURL: 'http://localhost:3000/auth/google/callback'
},
  function (accessToken, refreshToken, profile, done) {

    done(null, { profile });
  }
));
