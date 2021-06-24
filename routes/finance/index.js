const express = require("express");
const router = express.Router();
const controller = require("../../controllers");

const verifyToken = require("../../middlewares/verifyToken");
const Validate = require("../../middlewares/validate");

// Kategori
router.get("/kategori", controller.category.getKategori);
router.post("/kategori", verifyToken, Validate.category.checkKategory, controller.category.postKategori);
router.put("/kategori/:id", verifyToken, Validate.category.checkKategory, controller.category.putKategori);
router.delete("/kategori/:id", verifyToken, controller.category.delKategori);

// Expenditure
router.get("/expenditure", verifyToken, controller.expenditure.getExpenditure);
router.post("/expenditure", verifyToken, Validate.expenditure.checkExpenditure, controller.expenditure.postExpenditure);
router.put("/expenditure/:id", verifyToken, Validate.expenditure.checkExpenditure, controller.expenditure.putExpenditure);
router.delete("/expenditure/:id", verifyToken, controller.expenditure.delExpenditure);

// Income
router.get("/income", verifyToken, controller.income.getIncome);
router.post("/income", verifyToken, Validate.income.checkIncome, controller.income.postIncome);
router.put("/income/:id", verifyToken, Validate.income.checkIncome, controller.income.putIncome);
router.delete("/income/:id", verifyToken, controller.income.delIncome);

module.exports = router;