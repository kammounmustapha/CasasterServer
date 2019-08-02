const express = require("express");
const router = express.Router();
const passport = require("passport");
const ctrlAction = require("../controllers/action.controller");

router.post(
  "/action",
  passport.authenticate("jwt", { session: false }),
  ctrlAction.create
);

router.delete(
  "/action/:id",
  passport.authenticate("jwt", { session: false }),
  ctrlAction.delete
);

router.put(
  "/action/:id",
  passport.authenticate("jwt", { session: false }),
  ctrlAction.delete
);

router.get(
  "/action",
  passport.authenticate("jwt", { session: false }),
  ctrlAction.getAll
);

router.get(
  "/action/:id",
  passport.authenticate("jwt", { session: false }),
  ctrlAction.get
);

module.exports = router;
