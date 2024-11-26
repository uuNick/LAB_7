const express = require('express');
const router = express.Router();
const BuyerController = require("../controllers/buyerController");

// 1. Создание нового покупателя
router.post("/", BuyerController.create);

// 2. Получение всех покупателей с пагинацией
router.get("/", BuyerController.getAll);

// 3. Сортировка покупателей
router.get("/sorted", BuyerController.getSorted);

// 4. Фильтрация покупателей
router.get("/filtered", BuyerController.getFiltered);

// 5. Поиск покупателей
router.get("/search", BuyerController.search);

// 6. Получение покупателя по ID
router.get("/:id", BuyerController.getById);

// 7. Обновление покупателя
router.put("/:id", BuyerController.updateBuyer);

// 8. Удаление покупателя
router.delete("/:id", BuyerController.deleteBuyer); 

module.exports = router;