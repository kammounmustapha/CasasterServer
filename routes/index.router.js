const express = require("express");
const router = express.Router();

const ctrlUser = require("../controllers/user.controller");

const jwtHelper = require("../config/jwtHelper");

router.post("/register", ctrlUser.register);
router.post("/authenticate", ctrlUser.authenticate);
router.get("/userProfile", jwtHelper.verifyJwtToken, ctrlUser.userProfile);
router.get("/usersList", jwtHelper.verifyJwtToken, ctrlUser.usersProfiles);
router.delete("/userDelete", jwtHelper.verifyJwtToken, ctrlUser.userDelete);
module.exports = router;
