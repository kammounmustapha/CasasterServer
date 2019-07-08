const mongoose = require("mongoose");
const passport = require("passport");
const _ = require("lodash");

const User = mongoose.model("User");

module.exports.register = (req, res, next) => {
  var user = new User();
  user.fullName = req.body.fullName;
  user.email = req.body.email;
  user.password = req.body.password;
  user.role = req.body.role;
  user.save((err, doc) => {
    if (!err) res.send(doc);
    else {
      if (err.code == 11000)
        res.status(422).send(["Duplicate email adrress found."]);
      else return next(err);
    }
  });
};

module.exports.authenticate = (req, res, next) => {
  // call for passport authentication
  passport.authenticate("local", (err, user, info) => {
    // error from passport middleware
    if (err) return res.status(400).json(err);
    // registered user
    else if (user)
      return res
        .status(200)
        .json({ token: user.generateJwt(), email: user.email });
    // unknown user or wrong password
    else return res.status(404).json(info);
  })(req, res);
};

module.exports.userProfile = (req, res, next) => {
  User.findOne({ _id: req._id }, (err, user) => {
    if (!user)
      return res
        .status(404)
        .json({ status: false, message: "User record not found." });
    else
      return res.status(200).json({
        status: true,
        user: _.pick(user, ["fullName", "email", "role"])
      });
  });
};

module.exports.usersProfiles = (req, res, next) => {
  User.find({ _id: { $ne: req._id } })
    .select("fullName email role -_id")
    .exec(function(err, users) {
      if (err)
        return res
          .status(404)
          .json({ status: false, message: "cannot retrieve users" });
      else
        return res.status(200).json({
          status: true,
          users: users
        });
    });
  console.log(req._id);
};

module.exports.userDelete = (req, res, next) => {
  User.findOneAndDelete({ _id: req.body.userId }, (err, doc) => {
    if (err) {
      res.status(402).json({ message: "cannot delete" });
    } else if (!doc) {
      res.status(403).json({ message: "user not found!" });
    } else {
      res.status(200).json({
        status: true,
        doc: doc
      });
    }
  });
};
