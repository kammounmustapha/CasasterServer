const express = require("express");
const router = express.Router();
const passport = require("passport");
const ctrlLicense = require("../controllers/license.controller");
router.post(
  "/license",
  passport.authenticate("jwt", { session: false }),
  ctrlLicense.createLicense
);
router.put(
  "/license/:id",
  passport.authenticate("jwt", { session: false }),
  ctrlLicense.update
);

router.delete(
  "/license/:id",
  passport.authenticate("jwt", { session: false }),
  ctrlLicense.delete
);

router.get(
  "/license",
  passport.authenticate("jwt", { session: false }),
  ctrlLicense.getAll
);

router.get(
  "/license/:id",
  passport.authenticate("jwt", { session: false }),
  ctrlLicense.getById
);

module.exports = router;
