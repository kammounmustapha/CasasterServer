const passport = require("passport");
const mongoose = require("mongoose");
var JwtStrategy = require("passport-jwt").Strategy,
  ExtractJwt = require("passport-jwt").ExtractJwt;
var User = mongoose.model("User");
const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
  passReqToCallback: true
};
passport.use(
  new JwtStrategy(opts, function(req, jwt_payload, done) {
    User.findOne({ id: jwt_payload._id }, function(err, user) {
      if (err) {
        return done(err, false);
      }
      if (user) {
        req.user = user;
        return done(null, user);
      } else {
        return done(null, false);
        // or you could create a new account
      }
    });
  })
);
