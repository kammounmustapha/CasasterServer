const express = require("express");
const router = express.Router();
const passport = require("passport");
const ctrlLicenseApp = require("../controllers/licenseApplication.controller");

router.post(
  "/licenseApplication",
  passport.authenticate("jwt", { session: false }),
  ctrlLicenseApp.createLicenseApplication
);
router.put(
  "/licenseApplication/:id",
  passport.authenticate("jwt", { session: false }),
  ctrlLicenseApp.update
);

router.delete(
  "/licenseApplication/:id",
  passport.authenticate("jwt", { session: false }),
  ctrlLicenseApp.delete
);

router.get(
  "/licenseApplication",
  passport.authenticate("jwt", { session: false }),
  ctrlLicenseApp.getAll
);

router.get(
  "/licenseApplication/:id",
  passport.authenticate("jwt", { session: false }),
  ctrlLicenseApp.getById
);

router.get("/hello", (req, res) => {
  res.json("hello");
});

module.exports = router;
