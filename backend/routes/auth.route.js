const express = require("express");
const router = express.Router();
const controller = require("../controllers/auth.controller");
const validator = require("../validations/auth.validator");
const VerifyToken = require("../middlewares/verifyToken");

router.route("/signup").post(validator.signupValidation, controller.signup);

router.route("/login").post(validator.loginValidation, controller.login);

router.route("/logout").post(controller.logout);

router.route("/update-profile").put(VerifyToken, controller.updateProfile);

router.route("/check-auth").get(VerifyToken, controller.checkAuth);

module.exports = router;
