const mongoose = require("mongoose");
const passport = require("passport");
const _ = require("lodash");
const bcrypt = require("bcryptjs");
const User = mongoose.model("User");
const jwt = require("jsonwebtoken");
module.exports.singup = (req, res, next) => {
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

module.exports.signin = (req, res, next) => {
  var email = req.body.email;
  var password = req.body.password;
  User.findOne({ email: email }, (err, user) => {
    if (!user) {
      return res.status(404).json(err);
    }
    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (isMatch) {
        const payload = {
          id: user._id,
          email: user.email
        };
        jwt.sign(
          payload,
          process.env.JWT_SECRET,
          {
            expiresIn: process.env.JWT_EXP
          },
          (err, token) => {
            if (err) res.status(500).json({ message: "Error signing token" });
            res.json({ status: true, token: `Bearer ${token}` });
          }
        );
      } else {
        res.status(400).json({ message: "Password is incorrect!" });
      }
    });
  });
};

module.exports.userProfile = (req, res, next) => {
  User.findOne({ _id: req.user._id }, (err, user) => {
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

module.exports.usersList = (req, res, next) => {
  User.find({ _id: { $ne: req.user._id } })
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
