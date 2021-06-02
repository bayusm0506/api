const express = require("express");
const router = express.Router();
const controller = require("../../controllers");

const verifyToken = require("../../middlewares/verifyToken");

// Kategori
router.get("/", verifyToken, controller.category.index);
router.get("/kategori", verifyToken, controller.category.getKategori);
router.post("/kategori", verifyToken, controller.category.postKategori);
router.put("/kategori/:id", verifyToken, controller.category.putKategori);
router.delete("/kategori/:id", verifyToken, controller.category.delKategori);

module.exports = router;