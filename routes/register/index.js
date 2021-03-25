const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const controller = require("../../controllers");

const verifyToken = require("../../middlewares/verifyToken");

// Routes
router.get("/", controller.register.index);
router.post("/login", controller.register.login);
router.post("/register", controller.register.register);
router.get("/users", verifyToken, controller.register.users);

module.exports = router;
