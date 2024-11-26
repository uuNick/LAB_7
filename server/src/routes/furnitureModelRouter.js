const express = require('express');
const router = express.Router();
const FurnitureModelController = require("../controllers/furnitureModelController");

// 1. Создание новой модели мебели
router.post("/", FurnitureModelController.create);

// 2. Получение всех моделей мебели с пагинацией
router.get("/", FurnitureModelController.getAll);

// 3. Сортировка моделей мебели
router.get("/sorted", FurnitureModelController.getSorted);

// 4. Фильтрация моделей мебели
router.get("/filtered", FurnitureModelController.getFiltered);

// 5. Поиск моделей мебели
router.get("/search", FurnitureModelController.search);

// 6. Получение модели мебели по ID
router.get("/:id", FurnitureModelController.getById);

// 7. Обновление модели мебели
router.put("/:id", FurnitureModelController.updateFurnitureModel);

// 8. Удаление модели мебели
router.delete("/:id", FurnitureModelController.deleteFurnitureModel); 

module.exports = router;