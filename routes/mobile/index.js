const express = require("express");
const router = express.Router();
const controller = require("../../controllers");

const verifyToken = require("../../middlewares/verifyToken");

// Routes
router.get("/", verifyToken, controller.mobile.index);

module.exports = router;
