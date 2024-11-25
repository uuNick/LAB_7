const Sale = require("../models/Sale");

class SaleContrtoller {
    // 1. Создание новой записи
    async create(req, res) {
        const { quantity, contract_number, furniture_model_id } = req.body;

        try {
            const sale = await Sale.create({
                quantity,
                contract_number,
                furniture_model_id,
            });
            return res.status(201).json(sale); // 201 Создано
        } catch (error) {
            console.error(error);
            return res
                .status(500)
                .json({ message: "Ошибка при создании продажи", error });
        }
    }

    // 2. Получение списка записей с поддержкой пагинации
    async getAll(req, res) {
        const { page = 1, limit = 10 } = req.query; // Параметры пагинации
        const offset = (page - 1) * limit;

        try {
            const sales = await Sale.findAndCountAll({
                limit: limit,
                offset: offset,
            });
            return res.json({
                total: sales.count,
                pages: Math.ceil(sales.count / limit),
                data: sales.rows,
            });
        } catch (error) {
            console.error("Ошибка при получении продаж:", error);
            return res
                .status(500)
                .json({ message: "Ошибка при получении продаж", error });
        }
    }

    // 3. Получение списка записей с поддержкой сортировки
    // async getSorted(req, res) {
    //     const { sortBy = "publication_name", order = "ASC" } = req.query;

    //     try {
    //         const publications = await Publication.findAll({
    //             order: [[sortBy, order]],
    //         });
    //         return res.json(publications);
    //     } catch (error) {
    //         console.error("Ошибка при получении продаж:", error);
    //         return res
    //             .status(500)
    //             .json({ message: "Ошибка при получении продаж", error });
    //     }
    // }

    // 4. Получение списка записей с поддержкой фильтрации
    async getFiltered(req, res) {
        const { quantity } = req.query;

        try {
            // Если publication_type не указан или пустой, возвращаем ошибку
            if (!quantity) {
                return res.status(400).json({ message: "Количество проданной модели не указано" });
            }

            const sales = await Sale.findAll({
                where: { quantity },
            });

            return res.json(sales);
        } catch (error) {
            console.error("Ошибка при получении продаж:", error);
            return res
                .status(500)
                .json({ message: "Ошибка при получении продаж", error });
        }
    }

    // 5. Получение списка записей с поддержкой поиска
    async search(req, res) {
        const { search } = req.query;

        try {
            const sales = await Sale.findAll({
                where: {
                    furniture_model_id: { [Op.like]: `%${search}%` }
                },
            });
            return res.json(sales);
        } catch (error) {
            console.error("Ошибка при поиске продаж:", error);
            return res
                .status(500)
                .json({ message: "Ошибка при поиске продаж", error });
        }
    }

    // 6. Получение детальной информации по ID
    async getById(req, res) {
        const { id } = req.params;

        try {
            const sale = await Sale.findOne({
                where: { id: id },
            });

            if (!sale) {
                return res.status(404).json({ message: "Продажа не найдена" });
            }

            return res.json(sale);
        } catch (error) {
            return res
                .status(500)
                .json({ message: "Ошибка при получении продаж", error });
        }
    }

    // 7. Обработка случая отсутствия записи
    async checkExistence(req, res) {
        const { id } = req.params;

        try {
            const sale = await Sale.findOne({
                where: { id: id },
            });

            if (!sale) {
                return res.status(404).json({ message: "Продажа не найдена" });
            }

            return res.status(200).json({ message: "Продажа существует" });
        } catch (error) {
            return res.status(500).json({
                message: "Ошибка при проверке существования продажи",
                error,
            });
        }
    }

    // 8. Обновление записи
    async updateSale(req, res) {
        const { id } = req.params;
        const { quantity} = req.body;

        try {
            if (!id) {
                return res.status(400).json({ message: "ID продажи не указано" });
            }

            const sale = await Sale.findOne({
                where: { id: id },
            });

            if (!sale) {
                return res.status(404).json({ message: "Контракт не найден" });
            }

            // Обновляем только те поля, которые были переданы
            const updatedFields = {};
            if (quantity)
                updatedFields.quantity = quantity;

            // Если нет никаких полей для обновления, возвращаем ошибку
            if (Object.keys(updatedFields).length === 0) {
                return res.status(400).json({ message: "Нет данных для обновления" });
            }

            // Обновление контракта и возврат обновленного объекта
            const [_, updatedSales] = await Sale.update(
                updatedFields,
                {
                    where: { id: id },
                    returning: true, // Возвращаем обновленные строки
                }
            );

            // Возвращаем обновленный контракт
            return res.json(updatedSales[0]);
        } catch (error) {
            console.error("Ошибка при обновлении продажи:", error);
            return res.status(500).json({
                message: "Ошибка при обновлении продажи",
                error: error.message,
            });
        }
    }

    // 9. Удаление записи
    async deleteSale(req, res) {
        const { id } = req.params;

        try {
            const sale = await Sale.findOne({
                where: { id: id },
            });

            if (!sale) {
                return res.status(404).json({ message: "Продажа не найдена" });
            }

            await Sale.destroy({
                where: { id: id },
            });

            return res.status(204).send(); // 204 Нет содержимого
        } catch (error) {
            return res
                .status(500)
                .json({ message: "Ошибка при удалении продажи", error });
        }
    }
}

module.exports = new SaleContrtoller();