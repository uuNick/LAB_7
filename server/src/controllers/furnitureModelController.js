const FurnitureModel = require("../models/FurnitureModel");
const { Op } = require('sequelize');


class FurnitureModelController {
    // 1. Создание новой записи
    async create(req, res) {
        const { furniture_name, model, characteristics, price } = req.body;

        try {
            const furnitureModel = await FurnitureModel.create({
                furniture_name,
                model,
                characteristics,
                price
            });
            return res.status(201).json(furnitureModel);
        } catch (error) {
            console.error(error);
            return res
                .status(500)
                .json({ message: "Ошибка при создании модели мебели", error });
        }
    }

    async getAllWithoutPag(req, res) {
        try {
            const furnitureModels = await FurnitureModel.findAll();
            return res.json(furnitureModels);
        } catch {
            console.error('Ошибка при получении моделей мебели:', error);
            return res.status(500).json({ error: 'Ошибка сервера' });
        }
    }

    // 2. Получение списка записей с поддержкой пагинации
    async getAll(req, res) {
        const { page = 1, limit = 10 } = req.query;
        const offset = (page - 1) * limit;

        try {
            const furnitureModels = await FurnitureModel.findAndCountAll({
                limit: limit,
                offset: offset,
            });
            return res.json({
                total: furnitureModels.count,
                pages: Math.ceil(furnitureModels.count / limit),
                data: furnitureModels.rows,
            });
        } catch (error) {
            console.error("Ошибка при получении моделей мебели:", error);
            return res
                .status(500)
                .json({ message: "Ошибка при получении моделей мебели", error });
        }
    }

    // 3. Получение списка записей с поддержкой сортировки
    async getSorted(req, res) {
        const { sortBy = "furniture_name", order = "ASC", page = 1, limit = 10 } = req.query;
        const offset = (page - 1) * limit;

        try {
            const furnitureModels = await FurnitureModel.findAndCountAll({
                order: [[sortBy, order]],
                offset: offset,
                limit: limit,
            });
            return res.json({
                total: furnitureModels.count,
                pages: Math.ceil(furnitureModels.count / limit),
                data: furnitureModels.rows,
            });
        } catch (error) {
            console.error("Ошибка при получении моделей мебели:", error);
            return res
                .status(500)
                .json({ message: "Ошибка при получении моделей мебели", error });
        }
    }

    // 4. Получение списка записей с поддержкой фильтрации
    async getFiltered(req, res) {
        const { price_from, price_to } = req.query;

        try {
            const whereClause = {}

            if (price_from && price_to) {
                whereClause.price = {
                    [Op.between]: [price_from, price_to],
                };
            }
            else {
                return res.status(400).json({ message: "Диапазон цены не указан" });
            }
            const furnitureModels = await FurnitureModel.findAll({
                where: whereClause,
            });

            return res.json(furnitureModels);
        } catch (error) {
            console.error("Ошибка при получении моделей мебели:", error);
            return res
                .status(500)
                .json({ message: "Ошибка при получении моделей мебели", error });
        }
    }

    // 5. Получение списка записей с поддержкой поиска
    async search(req, res) {
        const { search, page = 1, limit = 10 } = req.query;
        const offset = (page - 1) * limit;

        try {
            const furnitureModels = await FurnitureModel.findAndCountAll({
                where: {
                    [Op.or]: [
                        { furniture_name: { [Op.like]: `%${search}%` } },
                        { characteristics: { [Op.like]: `%${search}%` } },
                    ],
                },
                offset: offset,
                limit: limit,
            });
            return res.json({
                total: furnitureModels.count,
                pages: Math.ceil(furnitureModels.count / limit),
                data: furnitureModels.rows,
            });
        } catch (error) {
            console.error("Ошибка при поиске моделей мебели:", error);
            return res
                .status(500)
                .json({ message: "Ошибка при поиске моделей мебели", error });
        }
    }

    // 6. Получение детальной информации по ID
    async getById(req, res) {
        const { id } = req.params;

        try {
            const furnitureModel = await FurnitureModel.findOne({
                where: { furniture_model_id: id },
            });

            if (!furnitureModel) {
                return res.status(404).json({ message: "Модель мебели не найдена" });
            }

            return res.json(furnitureModel);
        } catch (error) {
            return res
                .status(500)
                .json({ message: "Ошибка при получении моделей мебели", error });
        }
    }

    // 7. Обработка случая отсутствия записи
    async checkExistence(req, res) {
        const { id } = req.params;

        try {
            const furnitureModel = await FurnitureModel.findOne({
                where: { furniture_model_id: id },
            });

            if (!furnitureModel) {
                return res.status(404).json({ message: "Модель мебели не найдена" });
            }

            return res.status(200).json({ message: "Модель мебели существует" });
        } catch (error) {
            return res.status(500).json({
                message: "Ошибка при проверке существования модели мебели",
                error,
            });
        }
    }

    // 8. Обновление записи
    async updateFurnitureModel(req, res) {
        const { id } = req.params;
        const { furniture_name, model, characteristics, price } = req.body;

        try {
            const furnitureModel = await FurnitureModel.findOne({
                where: { furniture_model_id: id },
            });

            if (!furnitureModel) {
                return res.status(404).json({ message: "Модель мебели не найдена" });
            }

            await FurnitureModel.update(
                { furniture_name, model, characteristics, price },
                { where: { furniture_model_id: id } }
            );

            const updatedFurnitureModel = await FurnitureModel.findOne({
                where: { furniture_model_id: id },
            });

            return res.json(updatedFurnitureModel);
        } catch (error) {
            return res
                .status(500)
                .json({ message: "Ошибка при обновлении модели мебели", error });
        }
    }

    // 9. Удаление записи
    async deleteFurnitureModel(req, res) {
        const { id } = req.params;

        try {
            const furnitureModel = await FurnitureModel.findOne({
                where: { furniture_model_id: id },
            });

            if (!furnitureModel) {
                return res.status(404).json({ message: "Модель мебели не найдена" });
            }

            await FurnitureModel.destroy({
                where: { furniture_model_id: id },
            });

            return res.status(200).json({ message: "Мебель успешно удалена" });
        } catch (error) {
            return res
                .status(500)
                .json({ message: "Ошибка при удалении модели мебели", error });
        }
    }
}

module.exports = new FurnitureModelController();