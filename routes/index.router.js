const express = require("express");
const router = express.Router();
const passport = require("passport");
const ctrlUser = require("../controllers/user.controller");

const jwtHelper = require("../config/jwtHelper");

router.post("/signup", ctrlUser.singup);
router.post("/signin", ctrlUser.signin);
router.get(
  "/userProfile",
  passport.authenticate("jwt", { session: false }),
  ctrlUser.userProfile
);
router.get(
  "/usersList",
  passport.authenticate("jwt", { session: false }),
  ctrlUser.usersList
);
router.delete("/userDelete", ctrlUser.userDelete);
module.exports = router;
