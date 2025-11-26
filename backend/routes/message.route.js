const express = require("express");
const controller = require("../controllers/message.controller");
const VerifyToken = require("../middlewares/verifyToken");

const router = express.Router();

router.route("/users").get(VerifyToken, controller.getUsers);

router.route("/:id").get(VerifyToken, controller.getMessages);

router.route("/send/:id").post(VerifyToken, controller.sendMessage);

module.exports = router;
