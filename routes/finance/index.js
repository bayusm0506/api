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

// 
router.get("/expenditure", verifyToken, controller.expenditure.getExpenditure);
router.post("/expenditure", verifyToken, controller.expenditure.postExpenditure);
router.put("/expenditure/:id", verifyToken, controller.expenditure.putExpenditure);
router.delete("/expenditure/:id", verifyToken, controller.expenditure.delExpenditure);

module.exports = router;