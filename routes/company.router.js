const express = require("express");
const router = express.Router();
const passport = require("passport");
const ctrlCompany = require("../controllers/company.controller");
const jwtHelper = require("../config/jwtHelper");

router.post(
  "/company",
  passport.authenticate("jwt", { session: false }),
  jwtHelper.requireAdmin,
  ctrlCompany.createCompany
);
router.get( 
  "/company",
  passport.authenticate("jwt", { session: false }),
  // jwtHelper.requireAdmin,
  ctrlCompany.companiesList
);
router.get(
  "/company/:id",
  passport.authenticate("jwt", { session: false }),
  //  jwtHelper.requireAdmin,
  ctrlCompany.findById
);
router.delete(
  "/company/:id",
  passport.authenticate("jwt", { session: false }),
  jwtHelper.requireAdmin,
  ctrlCompany.delete
);
router.put(
  "/company/:id",
  passport.authenticate("jwt", { session: false }),
  jwtHelper.requireAdmin,
  ctrlCompany.update
);
module.exports = router;
