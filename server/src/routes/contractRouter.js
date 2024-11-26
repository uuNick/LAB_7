const express = require('express');
const router = express.Router();
const ContractController = require("../controllers/contractController");

// 1. Создание нового контракта
router.post("/", ContractController.create);

// 2. Получение всех контрактов с пагинацией
router.get("/", ContractController.getAll);

// 3. Сортировка контрактов
router.get("/sorted", ContractController.getSorted);

// 4. Фильтрация контрактов
router.get("/filtered", ContractController.getFiltered);

// 5. Поиск контрактов
router.get("/search", ContractController.search);

// 6. Получение контракта по ID
router.get("/:id", ContractController.getById);

// 7. Обновление контракта
router.put("/:id", ContractController.updateContract);

// 8. Удаление контракта
router.delete("/:id", ContractController.deleteContract); 

module.exports = router;