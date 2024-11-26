const express = require("express");
const router = express.Router();
const buyerRouter = require("./buyerRouter");
const contractRouter = require("./contractRouter");
const furnitureModelRouter = require("./furnitureModelRouter");
const saleRouter = require("./saleRouter");

// Подключаем маршруты
router.use("/buyer", buyerRouter);
router.use("/contract", contractRouter);
router.use("/furnitureModel", furnitureModelRouter);
router.use("/sale", saleRouter);

module.exports = router;