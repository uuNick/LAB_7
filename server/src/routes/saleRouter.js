const express = require('express');
const router = express.Router();
const SaleContrtoller = require("../controllers/saleController");

// 1. Создание новой продажи
router.post("/", SaleContrtoller.create);

// 2. Получение всех продаж с пагинацией
router.get("/", SaleContrtoller.getAll);

// 3. Сортировка продаж
//router.get("/sorted", SaleContrtoller.getSorted);

// 4. Фильтрация продаж
router.get("/filtered", SaleContrtoller.getFiltered);

// 5. Поиск продаж
router.get("/search", SaleContrtoller.search);

// 6. Получение продажи по ID
router.get("/:id", SaleContrtoller.getById);

// 7. Обновление продажи
router.put("/:id", SaleContrtoller.updateSale);

// 8. Удаление продажи
router.delete("/:id", SaleContrtoller.deleteSale); 

module.exports = router;