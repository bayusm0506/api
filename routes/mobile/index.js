const express = require("express");
const router = express.Router();
const controller = require("../../controllers");

// Routes
router.get("/", controller.mobile.index);

module.exports = router;
