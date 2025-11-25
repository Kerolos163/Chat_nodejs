const express = require("express");
const router = express.Router();
const controller = require("../controllers/auth.controller");
const validator = require("../validations/auth.validator");

router.route("/signup").post(validator.signupValidation ,controller.signup);

router.route("/login").post(controller.login);

router.route("/logout").post(controller.logout);

module.exports = router;
