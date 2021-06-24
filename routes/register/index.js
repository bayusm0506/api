const express = require("express");
const router = express.Router();
const controller = require("../../controllers");

const verifyToken = require("../../middlewares/verifyToken");
const Validate = require("../../middlewares/validate");

// Routes
router.post("/register", Validate.register.checkRegister, controller.register.register);
router.post("/login", controller.register.login);
router.post("/refreshToken", controller.register.refreshToken);
router.get("/users", verifyToken, controller.register.users);
router.put("/updatePassword/:id", verifyToken, controller.register.updatePassword);

module.exports = router;