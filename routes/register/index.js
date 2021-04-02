const express = require("express");
const router = express.Router();
const controller = require("../../controllers");

const verifyToken = require("../../middlewares/verifyToken");

// Routes
router.get("/", controller.register.index);
router.post("/register", controller.register.register);
router.post("/login", controller.register.login);
router.get("/users", verifyToken, controller.register.users);

module.exports = router;
